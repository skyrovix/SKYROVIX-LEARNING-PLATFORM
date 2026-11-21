import textCoursesCatalog from './textCoursesCatalog.json';

export interface TextLessonSummary {
  id: string;
  filename: string;
  order: number;
  title: string;
  readTimeMinutes: number;
  snippet: string;
  hasCode: boolean;
}

export interface TextLessonFull extends TextLessonSummary {
  content: string;
}

export interface TextCourseMetadata {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  category: string;
  icon: string;
  badge: string;
  level: string;
  instructor: string;
  rating: number;
  enrolledCount: number;
  type: string;
  lessonsCount: number;
  estimatedHours: string;
  lessons: TextLessonSummary[];
}

export interface TextCourseFull extends TextCourseMetadata {
  fullLessons: TextLessonFull[];
}

// In-memory cache for loaded courses
const fullCoursesCache: Record<string, TextCourseFull> = {};

export async function getTextCourse(slug: string): Promise<TextCourseFull | null> {
  if (fullCoursesCache[slug]) {
    return fullCoursesCache[slug];
  }

  try {
    // Dynamic import for client side
    const module = await import(`./text-courses/${slug}.json`);
    fullCoursesCache[slug] = module.default as TextCourseFull;
    return fullCoursesCache[slug];
  } catch (error) {
    console.error(`Failed to load text course ${slug}`, error);
    return null;
  }
}

export function getAllTextCourses(): TextCourseMetadata[] {
  return textCoursesCatalog as TextCourseMetadata[];
}

