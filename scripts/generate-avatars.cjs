const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'images', 'avatars');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const avatars = [
  // 1. Alex - Modern Coder with Headset & Hoodie
  {
    name: 'avatar-1.svg',
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg1" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF6B4A"/>
      <stop offset="1" stop-color="#FFA07A"/>
    </linearGradient>
    <linearGradient id="hoodie1" x1="60" y1="130" x2="140" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1E293B"/>
      <stop offset="1" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#bg1)"/>
  <!-- Body/Hoodie -->
  <path d="M40 200 C40 145 65 135 100 135 C135 135 160 145 160 200 Z" fill="url(#hoodie1)"/>
  <path d="M85 135 L100 160 L115 135 Z" fill="#E2E8F0"/>
  <!-- Head & Neck -->
  <rect x="90" y="115" width="20" height="25" rx="6" fill="#FBD5B5"/>
  <rect x="68" y="58" width="64" height="68" rx="32" fill="#FBD5B5"/>
  <!-- Hair (Cool Spiky Coder Hair) -->
  <path d="M64 68 C64 42 78 30 100 30 C122 30 136 42 136 68 C136 72 134 76 130 76 C126 76 124 62 120 62 C116 62 114 68 100 68 C86 68 84 62 80 62 C76 62 74 76 70 76 C66 76 64 72 64 68 Z" fill="#1E293B"/>
  <path d="M72 45 C80 32 95 26 115 28 C128 30 138 38 140 48 C135 44 125 40 115 42 C105 44 95 38 85 45 C78 50 74 46 72 45 Z" fill="#334155"/>
  <!-- Eyes -->
  <ellipse cx="84" cy="85" rx="4" ry="5" fill="#0F172A"/>
  <ellipse cx="116" cy="85" rx="4" ry="5" fill="#0F172A"/>
  <circle cx="85.5" cy="83.5" r="1.5" fill="#FFFFFF"/>
  <circle cx="117.5" cy="83.5" r="1.5" fill="#FFFFFF"/>
  <!-- Eyebrows -->
  <path d="M78 77 Q84 74 90 77" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M110 77 Q116 74 122 77" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Glasses -->
  <rect x="74" y="76" width="22" height="18" rx="7" stroke="#0F172A" stroke-width="2.5" fill="none"/>
  <rect x="104" y="76" width="22" height="18" rx="7" stroke="#0F172A" stroke-width="2.5" fill="none"/>
  <line x1="96" y1="84" x2="104" y2="84" stroke="#0F172A" stroke-width="2.5"/>
  <!-- Smile -->
  <path d="M93 104 Q100 110 107 104" stroke="#D97706" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Headset -->
  <path d="M60 75 C60 48 76 40 100 40 C124 40 140 48 140 75" stroke="#0F172A" stroke-width="5" stroke-linecap="round" fill="none"/>
  <rect x="54" y="70" width="12" height="26" rx="6" fill="#FB5435"/>
  <rect x="134" y="70" width="12" height="26" rx="6" fill="#FB5435"/>
  <!-- Headset Mic -->
  <path d="M60 90 Q65 110 82 108" stroke="#0F172A" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <circle cx="83" cy="108" r="3" fill="#FB5435"/>
</svg>`
  },

  // 2. Sarah - Frontend Architect with Bun & Chic Glasses
  {
    name: 'avatar-2.svg',
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#8B5CF6"/>
      <stop offset="1" stop-color="#C084FC"/>
    </linearGradient>
    <linearGradient id="top2" x1="60" y1="135" x2="140" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F43F5E"/>
      <stop offset="1" stop-color="#FB7185"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#bg2)"/>
  <!-- Hair Bun (Top) -->
  <circle cx="100" cy="34" r="20" fill="#471B10"/>
  <!-- Body -->
  <path d="M42 200 C42 148 68 138 100 138 C132 138 158 148 158 200 Z" fill="url(#top2)"/>
  <!-- Neck -->
  <rect x="91" y="118" width="18" height="24" rx="5" fill="#FBD8B8"/>
  <path d="M86 138 Q100 148 114 138" stroke="#FDA4AF" stroke-width="2" fill="none"/>
  <!-- Head -->
  <rect x="68" y="60" width="64" height="66" rx="32" fill="#FBD8B8"/>
  <!-- Hair Base & Bangs -->
  <path d="M64 72 C64 45 78 38 100 38 C122 38 136 45 136 72 C136 85 133 98 131 104 C128 92 126 80 120 70 C110 74 100 70 88 70 C80 72 74 85 69 104 C67 98 64 85 64 72 Z" fill="#471B10"/>
  <!-- Chic Round Glasses -->
  <circle cx="83" cy="86" r="12" stroke="#FBBF24" stroke-width="2.5" fill="#FFFFFF" fill-opacity="0.15"/>
  <circle cx="117" cy="86" r="12" stroke="#FBBF24" stroke-width="2.5" fill="#FFFFFF" fill-opacity="0.15"/>
  <line x1="95" y1="86" x2="105" y2="86" stroke="#FBBF24" stroke-width="2.5"/>
  <!-- Eyes -->
  <ellipse cx="83" cy="86" rx="3.5" ry="4.5" fill="#1E1B4B"/>
  <ellipse cx="117" cy="86" rx="3.5" ry="4.5" fill="#1E1B4B"/>
  <circle cx="84.5" cy="84.5" r="1.5" fill="#FFFFFF"/>
  <circle cx="118.5" cy="84.5" r="1.5" fill="#FFFFFF"/>
  <!-- Eyebrows -->
  <path d="M74 74 Q83 71 89 74" stroke="#471B10" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M111 74 Q117 71 126 74" stroke="#471B10" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Blush -->
  <circle cx="73" cy="94" r="5" fill="#FB7185" fill-opacity="0.5"/>
  <circle cx="127" cy="94" r="5" fill="#FB7185" fill-opacity="0.5"/>
  <!-- Smile -->
  <path d="M94 105 Q100 110 106 105" stroke="#E11D48" stroke-width="2.5" stroke-linecap="round" fill="none"/>
</svg>`
  },

  // 3. ByteBot - Cute Modern Friendly Coder Robot
  {
    name: 'avatar-3.svg',
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg3" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0F172A"/>
      <stop offset="1" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="screen3" x1="60" y1="60" x2="140" y2="120" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0284C7"/>
      <stop offset="1" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#bg3)"/>
  <!-- Antenna -->
  <line x1="100" y1="36" x2="100" y2="48" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>
  <circle cx="100" cy="30" r="8" fill="#38BDF8"/>
  <circle cx="100" cy="30" r="4" fill="#FFFFFF"/>
  <!-- Robot Body -->
  <path d="M45 200 C45 155 65 145 100 145 C135 145 155 155 155 200 Z" fill="#334155"/>
  <rect x="80" y="160" width="40" height="24" rx="6" fill="#1E293B"/>
  <circle cx="92" cy="172" r="3" fill="#22C55E"/>
  <circle cx="108" cy="172" r="3" fill="#38BDF8"/>
  <!-- Neck -->
  <rect x="88" y="132" width="24" height="16" rx="4" fill="#64748B"/>
  <!-- Robot Head -->
  <rect x="52" y="50" width="96" height="84" rx="28" fill="#E2E8F0"/>
  <!-- Head Ears / Audio Sensors -->
  <rect x="42" y="74" width="10" height="36" rx="5" fill="#38BDF8"/>
  <rect x="148" y="74" width="10" height="36" rx="5" fill="#38BDF8"/>
  <!-- Visor Screen -->
  <rect x="62" y="62" width="76" height="60" rx="18" fill="url(#screen3)"/>
  <!-- Glowing Digital Eyes -->
  <rect x="74" y="76" width="16" height="18" rx="8" fill="#FFFFFF"/>
  <rect x="110" y="76" width="16" height="18" rx="8" fill="#FFFFFF"/>
  <circle cx="82" cy="85" r="4" fill="#0284C7"/>
  <circle cx="118" cy="85" r="4" fill="#0284C7"/>
  <!-- Smile LED -->
  <path d="M88 104 Q100 112 112 104" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
</svg>`
  },

  // 4. Leo - Beanie Coder & Backend Dev
  {
    name: 'avatar-4.svg',
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg4" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10B981"/>
      <stop offset="1" stop-color="#34D399"/>
    </linearGradient>
    <linearGradient id="hoodie4" x1="50" y1="135" x2="150" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#334155"/>
      <stop offset="1" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#bg4)"/>
  <!-- Body -->
  <path d="M40 200 C40 148 65 138 100 138 C135 138 160 148 160 200 Z" fill="url(#hoodie4)"/>
  <!-- Neck -->
  <rect x="90" y="118" width="20" height="22" rx="5" fill="#E6BA95"/>
  <!-- Head -->
  <rect x="68" y="64" width="64" height="66" rx="32" fill="#E6BA95"/>
  <!-- Beard -->
  <path d="M68 95 C68 126 82 134 100 134 C118 134 132 126 132 95 C132 102 124 108 116 108 C108 108 104 102 100 102 C96 102 92 108 84 108 C76 108 68 102 68 95 Z" fill="#2E180E"/>
  <!-- Beanie (Warm Orange) -->
  <path d="M62 68 C62 38 78 32 100 32 C122 32 138 38 138 68 Z" fill="#EA580C"/>
  <rect x="58" y="64" width="84" height="14" rx="7" fill="#C2410C"/>
  <!-- Beanie Fold lines -->
  <line x1="75" y1="64" x2="75" y2="78" stroke="#9A3412" stroke-width="2"/>
  <line x1="90" y1="64" x2="90" y2="78" stroke="#9A3412" stroke-width="2"/>
  <line x1="110" y1="64" x2="110" y2="78" stroke="#9A3412" stroke-width="2"/>
  <line x1="125" y1="64" x2="125" y2="78" stroke="#9A3412" stroke-width="2"/>
  <!-- Eyes -->
  <circle cx="84" cy="88" r="4.5" fill="#1C1917"/>
  <circle cx="116" cy="88" r="4.5" fill="#1C1917"/>
  <circle cx="85.5" cy="86.5" r="1.5" fill="#FFFFFF"/>
  <circle cx="117.5" cy="86.5" r="1.5" fill="#FFFFFF"/>
  <!-- Stylish Square Glasses -->
  <rect x="74" y="80" width="22" height="16" rx="4" stroke="#1C1917" stroke-width="2.5" fill="none"/>
  <rect x="104" y="80" width="22" height="16" rx="4" stroke="#1C1917" stroke-width="2.5" fill="none"/>
  <line x1="96" y1="87" x2="104" y2="87" stroke="#1C1917" stroke-width="2.5"/>
  <!-- Smile -->
  <path d="M94 112 Q100 117 106 112" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`
  },

  // 5. Maya - Cyberpunk Neon Coder with Visor
  {
    name: 'avatar-5.svg',
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg5" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4F46E5"/>
      <stop offset="1" stop-color="#06B6D4"/>
    </linearGradient>
    <linearGradient id="visor5" x1="60" y1="75" x2="140" y2="95" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F43F5E"/>
      <stop offset="0.5" stop-color="#FB923C"/>
      <stop offset="1" stop-color="#FBBF24"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#bg5)"/>
  <!-- Body (Cyber Tech Jacket) -->
  <path d="M40 200 C40 148 65 138 100 138 C135 138 160 148 160 200 Z" fill="#0F172A"/>
  <path d="M100 138 L100 200" stroke="#06B6D4" stroke-width="3"/>
  <path d="M75 160 L60 200" stroke="#06B6D4" stroke-width="2"/>
  <path d="M125 160 L140 200" stroke="#06B6D4" stroke-width="2"/>
  <!-- Neck -->
  <rect x="91" y="118" width="18" height="24" rx="5" fill="#FCE7D2"/>
  <!-- Head -->
  <rect x="68" y="60" width="64" height="66" rx="32" fill="#FCE7D2"/>
  <!-- Hair (Sleek Asymmetrical Cyan/Dark Hair) -->
  <path d="M64 68 C64 42 78 34 100 34 C124 34 136 44 136 70 C136 84 132 94 130 100 C124 88 120 74 110 65 C96 68 84 66 70 76 C66 70 64 68 64 68 Z" fill="#1E1B4B"/>
  <path d="M64 68 C60 84 62 108 72 120 C70 106 68 92 68 82 Z" fill="#06B6D4"/>
  <!-- Cyber Visor / Glasses -->
  <rect x="66" y="76" width="68" height="20" rx="10" fill="url(#visor5)"/>
  <line x1="72" y1="86" x2="128" y2="86" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 2"/>
  <!-- Smile -->
  <path d="M94 106 Q100 110 106 106" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
</svg>`
  },

  // 6. Kai - Backwards Cap Cool Coder
  {
    name: 'avatar-6.svg',
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg6" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B82F6"/>
      <stop offset="1" stop-color="#60A5FA"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#bg6)"/>
  <!-- Body -->
  <path d="M40 200 C40 148 65 138 100 138 C135 138 160 148 160 200 Z" fill="#1E293B"/>
  <circle cx="100" cy="170" r="14" fill="#3B82F6"/>
  <!-- Neck -->
  <rect x="90" y="118" width="20" height="22" rx="5" fill="#F8D3B4"/>
  <!-- Head -->
  <rect x="68" y="62" width="64" height="66" rx="32" fill="#F8D3B4"/>
  <!-- Backwards Cap -->
  <path d="M64 68 C64 42 78 36 100 36 C122 36 136 42 136 68 Z" fill="#EF4444"/>
  <rect x="60" y="66" width="80" height="12" rx="6" fill="#DC2626"/>
  <!-- Cap snap strap on front -->
  <rect x="88" y="68" width="24" height="8" rx="4" fill="#B91C1C"/>
  <circle cx="95" cy="72" r="1.5" fill="#FFFFFF"/>
  <circle cx="105" cy="72" r="1.5" fill="#FFFFFF"/>
  <!-- Hair tips under cap -->
  <path d="M64 78 C62 88 64 96 68 102 C68 94 66 86 66 78 Z" fill="#18181B"/>
  <path d="M136 78 C138 88 136 96 132 102 C132 94 134 86 134 78 Z" fill="#18181B"/>
  <!-- Eyes -->
  <ellipse cx="84" cy="88" rx="4" ry="5" fill="#18181B"/>
  <ellipse cx="116" cy="88" rx="4" ry="5" fill="#18181B"/>
  <circle cx="85.5" cy="86.5" r="1.5" fill="#FFFFFF"/>
  <circle cx="117.5" cy="86.5" r="1.5" fill="#FFFFFF"/>
  <!-- Eyebrows -->
  <path d="M78 80 Q84 76 90 80" stroke="#18181B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M110 80 Q116 76 122 80" stroke="#18181B" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Smile -->
  <path d="M92 105 Q100 114 108 105" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Wireless Earbud -->
  <rect x="132" y="86" width="4" height="10" rx="2" fill="#FFFFFF"/>
</svg>`
  },

  // 7. Zara - Curly Afro Tech Star
  {
    name: 'avatar-7.svg',
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg7" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F59E0B"/>
      <stop offset="1" stop-color="#FBBF24"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#bg7)"/>
  <!-- Big Afro Hair -->
  <circle cx="100" cy="74" r="48" fill="#1C1917"/>
  <circle cx="70" cy="65" r="24" fill="#1C1917"/>
  <circle cx="130" cy="65" r="24" fill="#1C1917"/>
  <circle cx="60" cy="88" r="22" fill="#1C1917"/>
  <circle cx="140" cy="88" r="22" fill="#1C1917"/>
  <!-- Body (Teal Jacket) -->
  <path d="M40 200 C40 148 65 138 100 138 C135 138 160 148 160 200 Z" fill="#0D9488"/>
  <path d="M88 138 L100 162 L112 138 Z" fill="#FDE047"/>
  <!-- Neck -->
  <rect x="91" y="118" width="18" height="24" rx="5" fill="#8D5B4C"/>
  <!-- Head -->
  <rect x="70" y="66" width="60" height="64" rx="30" fill="#8D5B4C"/>
  <!-- Large Gold Hoop Earrings -->
  <circle cx="64" cy="98" r="10" stroke="#FBBF24" stroke-width="2.5" fill="none"/>
  <circle cx="136" cy="98" r="10" stroke="#FBBF24" stroke-width="2.5" fill="none"/>
  <!-- Eyes -->
  <ellipse cx="85" cy="88" rx="4" ry="5" fill="#18181B"/>
  <ellipse cx="115" cy="88" rx="4" ry="5" fill="#18181B"/>
  <circle cx="86.5" cy="86" r="1.5" fill="#FFFFFF"/>
  <circle cx="116.5" cy="86" r="1.5" fill="#FFFFFF"/>
  <!-- Smile -->
  <path d="M92 106 Q100 115 108 106" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
</svg>`
  },

  // 8. Elena - Data Science & AI Master with Headband
  {
    name: 'avatar-8.svg',
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg8" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#059669"/>
      <stop offset="1" stop-color="#34D399"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#bg8)"/>
  <!-- Body -->
  <path d="M42 200 C42 148 68 138 100 138 C132 138 158 148 158 200 Z" fill="#047857"/>
  <!-- Neck -->
  <rect x="91" y="118" width="18" height="24" rx="5" fill="#FCE8D5"/>
  <!-- Head -->
  <rect x="68" y="60" width="64" height="66" rx="32" fill="#FCE8D5"/>
  <!-- Long Sleek Dark Hair -->
  <path d="M62 70 C62 42 76 34 100 34 C124 34 138 42 138 70 C138 105 135 125 132 135 C124 95 120 74 100 74 C80 74 76 95 68 135 C65 125 62 105 62 70 Z" fill="#1E293B"/>
  <!-- Green Tech Headband -->
  <path d="M64 62 C74 52 126 52 136 62" stroke="#10B981" stroke-width="8" stroke-linecap="round" fill="none"/>
  <!-- Wireframe Glasses -->
  <rect x="74" y="80" width="22" height="16" rx="5" stroke="#1E293B" stroke-width="2" fill="#FFFFFF" fill-opacity="0.1"/>
  <rect x="104" y="80" width="22" height="16" rx="5" stroke="#1E293B" stroke-width="2" fill="#FFFFFF" fill-opacity="0.1"/>
  <line x1="96" y1="88" x2="104" y2="88" stroke="#1E293B" stroke-width="2"/>
  <!-- Eyes -->
  <circle cx="85" cy="88" r="4" fill="#0F172A"/>
  <circle cx="115" cy="88" r="4" fill="#0F172A"/>
  <circle cx="86.5" cy="86.5" r="1.5" fill="#FFFFFF"/>
  <circle cx="116.5" cy="86.5" r="1.5" fill="#FFFFFF"/>
  <!-- Smile -->
  <path d="M94 105 Q100 110 106 105" stroke="#D97706" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`
  }
];

avatars.forEach(item => {
  const filePath = path.join(outDir, item.name);
  fs.writeFileSync(filePath, item.svg.trim(), 'utf8');
  console.log('Generated:', item.name);
});
console.log('All 8 illustrated developer avatars generated successfully!');
