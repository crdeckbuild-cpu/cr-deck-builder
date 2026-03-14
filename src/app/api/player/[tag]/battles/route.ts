import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  const { tag } = await params;
  const cleanTag = tag.replace("#", "");
  const apiToken = process.env.CLASH_ROYALE_API_KEY;

  if (!apiToken) {
    return NextResponse.json({ error: "API Key bulunamadı" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.clashroyale.com/v1/players/%23${cleanTag}/battlelog`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return NextResponse.json([], { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Battle API Hatası:", error);
    return NextResponse.json([], { status: 500 });
  }
}