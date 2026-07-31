import { NextRequest, NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/db/connect";
import {
  ProjectModel,
  TechnologyModel,
  SkillModel,
  CertificationModel,
  AchievementModel,
  GalleryItemModel,
  SiteSettingsModel,
  ContactSubmissionModel,
} from "@/db/models";
import {
  initialProjects,
  initialTechnologies,
  initialSkillsNodes,
  initialCertifications,
  initialAchievements,
  initialGalleryItems,
  initialSiteSettings,
} from "@/db/seedData";

export function generateStaticParams() {
  return [
    { resource: "projects" },
    { resource: "technologies" },
    { resource: "skills" },
    { resource: "certifications" },
    { resource: "achievements" },
    { resource: "gallery" },
    { resource: "settings" },
    { resource: "messages" },
  ];
}

function getModel(resource: string) {
  switch (resource) {
    case "projects":
      return ProjectModel;
    case "technologies":
      return TechnologyModel;
    case "skills":
      return SkillModel;
    case "certifications":
      return CertificationModel;
    case "achievements":
      return AchievementModel;
    case "gallery":
      return GalleryItemModel;
    case "settings":
      return SiteSettingsModel;
    case "messages":
      return ContactSubmissionModel;
    default:
      return null;
  }
}

function getInitialData(resource: string) {
  switch (resource) {
    case "projects":
      return initialProjects;
    case "technologies":
      return initialTechnologies;
    case "skills":
      return initialSkillsNodes;
    case "certifications":
      return initialCertifications;
    case "achievements":
      return initialAchievements;
    case "gallery":
      return initialGalleryItems;
    case "settings":
      return initialSiteSettings;
    default:
      return [];
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { resource: string } }
) {
  const resource = params.resource;
  const db = await connectToDatabase();

  if (!db) {
    // Return fallback seed data if database is disconnected
    return NextResponse.json(getInitialData(resource));
  }

  const model = getModel(resource);
  if (!model) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  try {
    const data = await model.find({}).sort({ order: 1, createdAt: -1 });
    if (data.length === 0 && resource !== "messages") {
      return NextResponse.json(getInitialData(resource));
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${resource}:`, error);
    return NextResponse.json(getInitialData(resource));
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { resource: string } }
) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const resource = params.resource;
  const db = await connectToDatabase();
  if (!db) {
    return NextResponse.json({ success: true, mocked: true });
  }

  const model = getModel(resource);
  if (!model) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const newItem = await model.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error(`Error creating ${resource}:`, error);
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { resource: string } }
) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const resource = params.resource;
  const db = await connectToDatabase();
  if (!db) {
    return NextResponse.json({ success: true, mocked: true });
  }

  const model = getModel(resource);
  if (!model) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const { id, _id, ...updateData } = body;
    const itemId = id || _id;

    if (!itemId && resource !== "settings") {
      return NextResponse.json({ error: "Missing ID for update" }, { status: 400 });
    }

    if (resource === "settings") {
      const updated = await model.findOneAndUpdate({}, updateData, { upsert: true, new: true });
      return NextResponse.json(updated);
    }

    const updated = await model.findByIdAndUpdate(itemId, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(`Error updating ${resource}:`, error);
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { resource: string } }
) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const resource = params.resource;
  const db = await connectToDatabase();
  if (!db) {
    return NextResponse.json({ success: true, mocked: true });
  }

  const model = getModel(resource);
  if (!model) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    await model.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting ${resource}:`, error);
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
