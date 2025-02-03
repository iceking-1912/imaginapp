export const runtime = "edge";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "Genrate Img API is working",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    const inputs = {
      prompt:
        data.prompt ||
        "A serene winter scene of a snow-covered forest, with a cozy cabin lit by firelight, free of man-made structures.",
      width: data.width || 1920,
      height: data.height || 1080,
      seed: data.seed || 255424545,
      model: "flux",
      name: data.name,
    };

    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
      inputs.prompt
    )}?width=${inputs.width}&height=${inputs.height}&seed=${
      inputs.seed
    }&model=${inputs.model}&nologo=true`;

    return NextResponse.json({
      success: true,
      name: inputs.name,
      prompt: inputs.prompt,
      imageUrl: imageUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
