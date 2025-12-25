'use client';
import { useEffect, useRef } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

type Gesture = {
  cursor: { x: number; y: number };
  rotation: { x: number; y: number };
  isPinching: boolean;
  isFist?: boolean;
  isOpen?: boolean;
  isVictory?: boolean;
};

type HandTrackerProps = {
  onGestureUpdate: (gesture: Gesture) => void;
};

export default function HandTracker({ onGestureUpdate }: HandTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let cancelled = false;

    const TASKS_VISION_VERSION = '0.10.22-rc.20250304';
    const WASM_BASE_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VISION_VERSION}/wasm`;
    const MODEL_URL =
      'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

    const initMP = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(WASM_BASE_URL);

        const create = async (delegate: 'GPU' | 'CPU') =>
          HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: MODEL_URL,
              delegate,
            },
            runningMode: 'VIDEO',
            numHands: 1,
          });

        try {
          landmarkerRef.current = await create('GPU');
        } catch (gpuErr) {
          console.warn('[HandTracker] GPU delegate failed, falling back to CPU.', gpuErr);
          landmarkerRef.current = await create('CPU');
        }

        if (!cancelled) await startCamera();
      } catch (err) {
        console.error('[HandTracker] Failed to initialize MediaPipe hand landmarker.', err);
      }
    };

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          console.error('[HandTracker] getUserMedia is not available in this browser/context.');
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        });

        streamRef.current = stream;
        const video = videoRef.current;
        if (!video) return;

        video.srcObject = stream;
        await video.play();

        // Kick off prediction loop once we have frames.
        rafIdRef.current = requestAnimationFrame(predict);
      } catch (err) {
        console.error('[HandTracker] Camera start failed. Did you allow camera permission?', err);
      }
    };

    const predict = async () => {
      if (cancelled) return;
      const video = videoRef.current;
      const landmarker = landmarkerRef.current;

      try {
        if (video && landmarker && video.readyState >= 2) {
          const results = landmarker.detectForVideo(video, performance.now());
          if (results.landmarks && results.landmarks.length > 0) {
            const L = results.landmarks[0];

            const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
              Math.hypot(a.x - b.x, a.y - b.y);

            // Tính toán cử chỉ
            const pinchDist = dist(L[4], L[8]);
            const avgTipDist =
              [8, 12, 16, 20].reduce(
                (acc, idx) => acc + dist(L[idx], L[0]),
                0
              ) / 4;

            // Victory (✌️): ngón trỏ + giữa duỗi, áp út + út co.
            // Ngưỡng được chọn để tránh nhầm với OPEN (tất cả ngón đều duỗi).
            const dIndex = dist(L[8], L[0]);
            const dMiddle = dist(L[12], L[0]);
            const dRing = dist(L[16], L[0]);
            const dPinky = dist(L[20], L[0]);
            const vSep = dist(L[8], L[12]);
            const isVictory = dIndex > 0.38 && dMiddle > 0.38 && dRing < 0.32 && dPinky < 0.32 && vSep > 0.09;

            onGestureUpdate({
              cursor: { x: (1 - L[8].x) * 2 - 1, y: -L[8].y * 2 + 1 },
              rotation: { x: (L[9].y - 0.5) * 1.5, y: (L[9].x - 0.5) * 4 },
              isPinching: pinchDist < 0.05,
              isFist: avgTipDist < 0.25,
              isOpen: avgTipDist > 0.45,
              isVictory,
            });
          }
        }
      } catch (err) {
        console.error('[HandTracker] detectForVideo failed.', err);
      }

      rafIdRef.current = requestAnimationFrame(predict);
    };
    initMP();

    return () => {
      cancelled = true;
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;

      const stream = streamRef.current;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [onGestureUpdate]);

  return <video ref={videoRef} className="hidden" autoPlay muted playsInline />;
}