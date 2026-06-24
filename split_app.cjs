const fs = require('fs');

const appContent = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = appContent.split(/\r?\n/);

function getLineIndex(pattern) {
    return lines.findIndex(line => line.startsWith(pattern));
}

// Extract specific blocks
function extractBlock(startRegex, endRegexOrLineIdx) {
    const startIdx = lines.findIndex(line => line.match(startRegex));
    let endIdx;
    if (typeof endRegexOrLineIdx === 'number') {
        endIdx = endRegexOrLineIdx;
    } else {
        const afterStart = lines.slice(startIdx + 1);
        const relativeEnd = afterStart.findIndex(line => line.match(endRegexOrLineIdx));
        endIdx = relativeEnd === -1 ? lines.length : startIdx + 1 + relativeEnd;
    }
    return lines.slice(startIdx, endIdx).join('\n');
}

// Find boundaries based on grep output
const map = {
    FoxStrength: {
        main: extractBlock(/^function FoxStrength\(\) \{/, /^function FoxRun\(\) \{/),
        components: extractBlock(/^function Hero\(\) \{/, /^function RunningHero\(\) \{/)
    },
    FoxRun: {
        main: extractBlock(/^function FoxRun\(\) \{/, /^function DoKhop\(\) \{/),
        components: extractBlock(/^function RunningHero\(\) \{/, /^function MobilityHero\(\) \{/)
    },
    DoKhop: {
        main: extractBlock(/^function DoKhop\(\) \{/, /^function HybridTraining\(\) \{/),
        components: extractBlock(/^function MobilityHero\(\) \{/, /^function HybridHero\(\) \{/)
    },
    HybridTraining: {
        main: extractBlock(/^function HybridTraining\(\) \{/, /^function HyroxClass\(\) \{/),
        components: extractBlock(/^function HybridHero\(\) \{/, /^function HyroxHero\(\) \{/)
    },
    HyroxClass: {
        main: extractBlock(/^function HyroxClass\(\) \{/, /^function Nav\(\) \{/),
        components: extractBlock(/^function HyroxHero\(\) \{/, /^function Footer\(\) \{/)
    }
};

const commonImports = `import { useRef, useEffect } from "react";
import { CheckCircle2, Users, Flame, Activity, Footprints, Wind, Heart, Zap, Shield, Target, HeartPulse, Dumbbell, Timer, Infinity as InfinityIcon, Medal, MoveRight, ArrowRight, Gauge, Anchor, ChevronRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

`;

// Write new files
for (const [name, data] of Object.entries(map)) {
    // Add `export default ` to the main component
    const mainMod = data.main.replace(/^function /m, 'export default function ');
    fs.writeFileSync(`src/${name}.tsx`, commonImports + mainMod + '\n' + data.components);
}

// Now rewrite App.tsx to remove extracted parts and add imports
const topImportsEnd = getLineIndex("import Schedule from \"./Schedule\";");
const topImports = lines.slice(0, topImportsEnd + 1).join('\n');

const newImports = `
import FoxStrength from "./FoxStrength";
import FoxRun from "./FoxRun";
import DoKhop from "./DoKhop";
import HybridTraining from "./HybridTraining";
import HyroxClass from "./HyroxClass";
`;

const setupAndApp = extractBlock(/^gsap\.registerPlugin/, /^function FoxStrength\(\) \{/);
const nav = extractBlock(/^function Nav\(\) \{/, /^function Hero\(\) \{/);
const footer = extractBlock(/^function Footer\(\) \{/, lines.length);

const finalAppContent = [topImports, newImports, setupAndApp, nav, footer].join('\n');
fs.writeFileSync('src/App.tsx', finalAppContent);

console.log("Extraction complete!");
