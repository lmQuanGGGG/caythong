import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Đường dẫn đến thư mục chứa ảnh
  const photosDirectory = path.join(process.cwd(), 'public/image');
  
  try {
    // Đọc tất cả các file trong thư mục
    const fileNames = fs.readdirSync(photosDirectory);
    
    // Lọc ra các file ảnh (jpg, png, webp, etc.)
    const photos = fileNames.filter(fileName => 
      /\.(jpg|jpeg|png|webp|avif)$/i.test(fileName)
    ).map(fileName => `/image/${fileName}`);

    return NextResponse.json(photos);
  } catch (_error) {
    return NextResponse.json({ error: "Không tìm thấy thư mục ảnh" }, { status: 500 });
  }
}