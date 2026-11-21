// Skyrovix Brand Assets & Official Imagery
import skyrovixLogoTransparent from '../images/skyrovix-logo-transparent.png';
import skyrovixLogoWhite from '../images/skyrovix-logo-white.png';
import skLogoTransparent from '../images/sk-logo-transparent.png';
import skLogoWhite from '../images/sk-logo-white.png';
import skLogoOfficial from '../images/sk-logo-official.png';
import sealImage from '../images/seal.png';
import msmeImage from '../images/msme.png';
import sigFounderImage from '../images/sig-founder.png';
import sigCofounderImage from '../images/sig-cofounder.png';
import skyrovixStudentImg from '../images/skyrovix-student.png';
import skyrovixInternshipImg from '../images/skyrovix-internship-logo.png';
import founderImg from '../images/founder-hariharan.jpg';
import cofounderImg from '../images/cofounder-maheshwaran.jpg';

// Illustrated Developer Avatars (Memoji / Cartoon Vector Style)
import avatar1Svg from '../images/avatars/avatar-1.svg';
import avatar2Svg from '../images/avatars/avatar-2.svg';
import avatar3Svg from '../images/avatars/avatar-3.svg';
import avatar4Svg from '../images/avatars/avatar-4.svg';
import avatar5Svg from '../images/avatars/avatar-5.svg';
import avatar6Svg from '../images/avatars/avatar-6.svg';
import avatar7Svg from '../images/avatars/avatar-7.svg';
import avatar8Svg from '../images/avatars/avatar-8.svg';

export const developerAvatars = [
  { id: 'av-1', label: 'Alex (Headset Coder)', url: avatar1Svg },
  { id: 'av-2', label: 'Sarah (Frontend Architect)', url: avatar2Svg },
  { id: 'av-3', label: 'ByteBot (AI Tech Bot)', url: avatar3Svg },
  { id: 'av-4', label: 'Leo (Beanie Dev)', url: avatar4Svg },
  { id: 'av-5', label: 'Maya (Cyberpunk Visor)', url: avatar5Svg },
  { id: 'av-6', label: 'Kai (Cool Cap Coder)', url: avatar6Svg },
  { id: 'av-7', label: 'Zara (Cloud Star)', url: avatar7Svg },
  { id: 'av-8', label: 'Elena (Data Scientist)', url: avatar8Svg }
];

export const defaultStudentAvatar = avatar1Svg;

// Course Official Vector Logos (Devicon & Official Brand SVGs)
import htmlCourseSvg from '../images/courses/html.svg';
import cssCourseSvg from '../images/courses/css.svg';
import jsCourseSvg from '../images/courses/javascript.svg';
import javaCourseSvg from '../images/courses/java.svg';
import phpCourseSvg from '../images/courses/php.svg';
import reactCourseSvg from '../images/courses/react.svg';
import nextjsCourseSvg from '../images/courses/nextjs.svg';
import nodejsCourseSvg from '../images/courses/nodejs.svg';
import mongodbCourseSvg from '../images/courses/mongodb.svg';
import sqlCourseSvg from '../images/courses/sql.svg';
import mysqlCourseSvg from '../images/courses/mysql.svg';
import expressCourseSvg from '../images/courses/express.svg';

// Other courses
import pythonCourseImg from '../images/courses/python.png';
import djangoCourseImg from '../images/courses/django.png';
import numpyCourseImg from '../images/courses/numpy.png';
import pandasCourseImg from '../images/courses/pandas.png';
import matplotlibCourseImg from '../images/courses/matplotlib.png';
import scipyCourseImg from '../images/courses/scipy.png';

// Official Course Cover Banners (High-Resolution 16:9 Language Vectors)
import bannerFullstackSvg from '../images/banners/banner-fullstack.svg';
import bannerPythonSvg from '../images/banners/banner-python.svg';
import bannerAimlSvg from '../images/banners/banner-aiml.svg';
import bannerHtmlSvg from '../images/banners/banner-html.svg';
import bannerCssSvg from '../images/banners/banner-css.svg';
import bannerJavascriptSvg from '../images/banners/banner-javascript.svg';
import bannerGitSvg from '../images/banners/banner-git.svg';
import bannerReactSvg from '../images/banners/banner-react.svg';
import bannerNodejsSvg from '../images/banners/banner-nodejs.svg';
import bannerDatabaseSvg from '../images/banners/banner-database.svg';
import bannerNextjsSvg from '../images/banners/banner-nextjs.svg';
import bannerJavaSvg from '../images/banners/banner-java.svg';
import bannerPhpSvg from '../images/banners/banner-php.svg';
import bannerDjangoSvg from '../images/banners/banner-django.svg';

export const brandImages = {
  logo: skyrovixLogoTransparent,
  logoWhite: skyrovixLogoWhite,
  icon: skLogoOfficial,
  iconWhite: skLogoWhite,
  seal: sealImage,
  msme: msmeImage,
  sigFounder: sigFounderImage,
  sigCofounder: sigCofounderImage,
  founder: founderImg,
  cofounder: cofounderImg,
  skyrovixStudent: skyrovixStudentImg,
  internship: skyrovixInternshipImg
};

export const skyrovixTeamAvatar = skLogoOfficial;

export const courseThumbnails: Record<string, string> = {
  html: htmlCourseSvg,
  css: cssCourseSvg,
  javascript: jsCourseSvg,
  java: javaCourseSvg,
  php: phpCourseSvg,
  react: reactCourseSvg,
  nextjs: nextjsCourseSvg,
  nodejs: nodejsCourseSvg,
  mongodb: mongodbCourseSvg,
  sql: sqlCourseSvg,
  mysql: mysqlCourseSvg,
  express: expressCourseSvg,
  expressjs: expressCourseSvg,
  python: pythonCourseImg,
  django: djangoCourseImg,
  numpy: numpyCourseImg,
  pandas: pandasCourseImg,
  matplotlib: matplotlibCourseImg,
  scipy: scipyCourseImg
};

export const courseBanners = {
  fullstack: bannerFullstackSvg,
  html: bannerHtmlSvg,
  css: bannerCssSvg,
  javascript: bannerJavascriptSvg,
  git: bannerGitSvg,
  react: bannerReactSvg,
  nodejs: bannerNodejsSvg,
  database: bannerDatabaseSvg,
  nextjs: bannerNextjsSvg,
  python: bannerPythonSvg,
  aiml: bannerAimlSvg,
  java: bannerJavaSvg,
  php: bannerPhpSvg,
  django: bannerDjangoSvg
};

export const flagshipBanners = courseBanners;

export function getCourseBanner(idOrSlug: string, fallback?: string): string {
  const norm = idOrSlug.toLowerCase().replace(/^(vid-|text-)/, '');
  if (norm.includes('fullstack')) return bannerFullstackSvg;
  if (norm.includes('html')) return bannerHtmlSvg;
  if (norm.includes('css')) return bannerCssSvg;
  if (norm.includes('javascript') || norm === 'js') return bannerJavascriptSvg;
  if (norm.includes('git')) return bannerGitSvg;
  if (norm.includes('react')) return bannerReactSvg;
  if (norm.includes('node') || norm.includes('express')) return bannerNodejsSvg;
  if (norm.includes('database') || norm.includes('sql') || norm.includes('mysql') || norm.includes('mongodb') || norm.includes('postgres')) return bannerDatabaseSvg;
  if (norm.includes('next')) return bannerNextjsSvg;
  if (norm.includes('python')) return bannerPythonSvg;
  if (norm.includes('django')) return bannerDjangoSvg;
  if (norm.includes('java')) return bannerJavaSvg;
  if (norm.includes('php')) return bannerPhpSvg;
  if (norm.includes('numpy') || norm.includes('pandas') || norm.includes('matplotlib') || norm.includes('scipy') || norm.includes('ai') || norm.includes('machine') || norm.includes('data')) return bannerAimlSvg;
  return fallback || bannerFullstackSvg;
}

export function getCourseThumbnail(slug: string, fallback?: string): string {
  const normalized = slug.toLowerCase().replace(/^text-/, '');
  if (courseThumbnails[normalized]) {
    return courseThumbnails[normalized];
  }
  return fallback || htmlCourseSvg;
}
