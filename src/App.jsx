import React, { useState } from 'react';
import { 
  Mountain, Anchor, Shield, ChevronDown, ChevronUp, Paintbrush, 
  Image as ImageIcon, Heart, Lightbulb, Info, Mail, TreePine, Waves, 
  Palette, Sparkles, FileText, ShoppingBag, UserPlus, Box, Layers, 
  Zap, Clock, Accessibility, Languages, Presentation, EyeOff, 
  UserCheck, Stethoscope, Monitor, PenTool, QrCode, Loader2, 
  RefreshCw, Search, MessageSquare, ShieldAlert, CheckCircle2, 
  Castle, ChevronRight, AlertCircle, Coffee, Megaphone, Camera,
  Download, LayoutTemplate, Users, Star, X, Copy, Check
} from 'lucide-react';

// --- CONSTANTS ---
const METAPHORS = [
  { 
    id: 'mountain', label: 'Mountain', icon: <Mountain size={28} />,
    prompt: "Abstract minimalist painting of a stable mountain, geometric triangles, earthy sienna and deep teal colors, high contrast.",
    description: "Represents a support system that is always there. It stands tall and strong, providing a solid foundation. In abstract art, students might use strong, overlapping triangles, heavy textures, or earthy colors to show reliability and endurance." 
  },
  { 
    id: 'anchor', label: 'Anchor', icon: <Anchor size={28} />,
    prompt: "Abstract expressionist painting of a heavy symbolic anchor, deep indigo, bold lines, textured paint.",
    description: "Keeps a student grounded, calm, and focused when life gets stormy. Visually, students might use deep blue colors, heavy lines, or shapes placed at the very bottom of their artwork to represent weight and stability." 
  },
  { 
    id: 'shield', label: 'Shield', icon: <Shield size={28} />,
    prompt: "Abstract golden shield pattern, concentric layers, soft glowing light center, thick protective borders.",
    description: "About safety and guarding against negativity. It represents boundaries and safe spaces. Students might use bright, warm colors, enclosed circles, or thick borders to symbolize feeling wrapped in safety." 
  },
  { 
    id: 'tree', label: 'Tree', icon: <TreePine size={28} />,
    prompt: "Abstract tree, intricate roots, expansive branches, forest green and mahogany, organic shapes.",
    description: "Roots represent foundational values that ground us; the Trunk represents core strength and closest supporters; Branches represent the growth and connections that spread out as we move forward." 
  },
  { 
    id: 'fortress', label: 'Fortress', icon: <Castle size={28} />,
    prompt: "Abstract fortress, thick monumental blocks, stone gray and amber highlights, representing unshakeable strength.",
    description: "Represents unshakeable defense and a place of refuge. This metaphor is for a support system that provides a wall of protection against external storms. Visually, students might use large rectangular blocks and gray tones to show monumental durability." 
  },
  { 
    id: 'river', label: 'River', icon: <Waves size={28} />,
    prompt: "Abstract flowing river, fluid curves in cerulean and silver, winding movement, organic shapes.",
    description: "The Source represents the origin of strength; Flowing Water symbolizes growth over time; the Riverbank represents the support systems that keep us moving forward." 
  }
];

const EXTENDED_SUPPLIES = [
  {
    id: 'foundations', title: "Foundations & 3D", icon: <Box size={24} />,
    items: ["Corrugated Cardboard Sheets", "Foam Core Boards", "Popsicle Sticks (Jumbo & Reg)", "Wooden Dowels & Scraps", "Flexible Wire / Pipe Cleaners", "Self-Hardening Clay", "Plastic Armatures"],
    tip: "Structural integrity starts at the base. Use heavy-duty cardboard or wood scraps to support elements that reach upward."
  },
  {
    id: 'textures', title: "Media & Textures", icon: <Layers size={24} />,
    items: ["Magazine Cutouts & Ephemera", "Fabric Scraps (Burlap, Silk)", "Tissue Paper (Bleeding)", "Mesh / Netting", "Yarn, Twine & Floss", "Natural Items (Twigs, Stones)", "Buttons & Beads"],
    tip: "Texture is a conceptual language. Rough materials (burlap) represent struggle, while soft ones (silk) represent comfort."
  },
  {
    id: 'adhesives', title: "Adhesives & Tape", icon: <Zap size={24} />,
    items: ["Standard Washable Glue Sticks", "Tacky Glue (Fast Drying)", "Mod Podge (Matte & Gloss)", "Double-Sided Foam Tape", "Masking & Painter's Tape", "Hot Glue (Teacher Use Only)"],
    tip: "For vertical stability without hot glue, use double-sided foam tape for immediate tack or 'slot and tab' joinery."
  },
  {
    id: 'dry-media', title: "Dry Media", icon: <PenTool size={24} />,
    items: ["Graphite Pencils (HB, 2B, 4B)", "Charcoal Sticks & Pencils", "Oil Pastels", "Chalk Pastels", "Colored Pencils", "Fine Liners & Sharpies"],
    tip: "Oil pastels resist watercolors! Students can use them to draw strong boundaries before applying wet media over them."
  },
  {
    id: 'wet-media', title: "Wet Media & Paint", icon: <Palette size={24} />,
    items: ["Acrylic Paint Sets (Heavy Body)", "Liquid Watercolors", "Gouache Sets", "India Ink (Black)", "Paint Markers", "Tempera Paint Cakes"],
    tip: "Acrylics are permanent when dry, making them great for layering over mixed media. Watercolors need absorbent paper."
  },
  {
    id: 'tools', title: "Tools & Surfaces", icon: <Paintbrush size={24} />,
    items: ["Mixed Media Paper (98lb+)", "Canvas Boards (8x10+)", "Synthetic Brush Sets", "Texture Rollers & Sponges", "Palettes / Mixing Trays", "Precision Scissors"],
    tip: "Always ensure the paper weight (98lb+) can handle the amount of water or heavy glue students will be applying."
  }
];

const LESSON_PLANS = [
  {
    day: 1, title: "Imagine and Explore", time: "60 Min", color: "bg-teal-50 border-teal-200", btnColor: "bg-teal-600 hover:bg-teal-700",
    objective: "Students will define what 'strength' means to them, explore diverse sources of support, and select a metaphor to anchor their narrative.",
    slideUrl: "https://docs.google.com/presentation/d/1lirIthosxBehU_7ZBqy38MB3nS7aM6QlP7AMaD_TtNk/copy",
    content: (
      <div className="space-y-6 text-left">
        <div className="bg-white/60 p-6 rounded-xl border border-teal-100 shadow-sm">
          <h4 className="font-bold text-teal-800 mb-3 text-lg underline decoration-teal-200 underline-offset-4">1. Opening Discussion: What Gives You Strength? (15 min)</h4>
          <p className="leading-relaxed text-base text-slate-700 mb-4">"Today we begin a creative journey about you. We're asking the question: 'What gives you strength?' Strength isn't just about being physically strong; it's about the people, places, and values that support you when life gets hard."</p>
          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <p className="font-bold text-teal-900 mb-2">Guiding Questions to Ask the Class:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm text-slate-700">
              <li>"Who is the first person you call or talk to when you have good news?"</li>
              <li>"Where is a place you go when you need to feel safe and calm?"</li>
              <li>"What is a personal rule or value you have that keeps you going when things are difficult?"</li>
            </ul>
          </div>
          <p className="text-sm text-slate-600">Emphasize that support systems look different for everyone. Explain that students can express this through a 3D sculpture, a detailed 2D illustration, or a digital media piece.</p>
        </div>
        
        <div className="bg-white/60 p-6 rounded-xl border border-teal-100 shadow-sm">
          <h4 className="font-bold text-teal-800 mb-3 text-lg underline decoration-teal-200 underline-offset-4">2. Vocabulary & Concept Intro (10 min)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="border border-slate-200 p-4 rounded-lg bg-white">
                <span className="font-black text-slate-900 block mb-1">Abstract Art</span>
                <span className="text-sm text-slate-600">Art that uses shapes, colors, lines, and textures to express feelings or ideas, rather than trying to look exactly like a real-life object or person.</span>
             </div>
             <div className="border border-slate-200 p-4 rounded-lg bg-white">
                <span className="font-black text-slate-900 block mb-1">Metaphor</span>
                <span className="text-sm text-slate-600">A symbol that represents a bigger idea. Comparing your support system to a physical object to help describe how it feels.</span>
             </div>
          </div>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-teal-100 shadow-sm">
          <h4 className="font-bold text-teal-800 mb-3 text-lg underline decoration-teal-200 underline-offset-4">3. Analyzing Support & Metaphors (20 min)</h4>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">Reflect in small groups: How do your support systems show care? Brainstorm on the board how support <em>feels</em> (e.g., safe, warm, steady, protective, like a shield or a deep root).</p>
          <p className="mb-4 leading-relaxed text-sm text-slate-700">Introduce the core metaphors available in the Teaching Strategies tab. Have students sketch 2-3 rapid ideas in a sketchbook or on scratch paper to begin visualizing their metaphor.</p>
          <p className="italic text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border-l-4 border-teal-400">"If your grandma is your biggest supporter, is she a Mountain because she is unmoving, or a Fortress because she keeps you safe from the outside world?"</p>
        </div>
        
        <div className="bg-teal-100/50 p-4 rounded-xl border border-teal-200 flex gap-4">
           <Info className="text-teal-700 shrink-0 mt-1" size={24} />
           <div>
             <p className="font-bold text-teal-900">Teacher Note</p>
             <p className="text-sm text-slate-700 mt-1">Refer to the <span className="font-bold">Strategies tab</span> for expanded conceptualization prompts and metaphorical exploration tools before beginning Day 2.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 2, title: "Explore and Plan", time: "60 Min", color: "bg-emerald-50 border-emerald-200", btnColor: "bg-emerald-600 hover:bg-emerald-700",
    objective: "Students will translate their chosen metaphors into foundational structural sketches and begin building the physical base of their artwork.",
    slideUrl: "https://docs.google.com/presentation/d/1LoJJmCfLr_PB7y-fGRp1oapD9VA12uG9zZuLHG6CNNg/copy",
    content: (
      <div className="space-y-6 text-left">
        <div className="bg-white/60 p-6 rounded-xl border border-emerald-100 shadow-sm text-slate-700">
          <h4 className="font-bold text-emerald-800 mb-3 text-lg underline decoration-emerald-200 underline-offset-4">1. Normalizing Abstract Thinking (10 min)</h4>
          <p className="text-sm text-slate-700 mb-4">Remind students that abstraction takes the pressure off "getting it exactly right." The goal is emotional resonance, not realism.</p>
          <p className="italic text-sm leading-relaxed bg-slate-50 p-4 rounded-lg border-l-4 border-emerald-400">"Your art doesn’t need to look like a literal, perfect mountain—it just needs to represent what your support system feels like. Think about the story your shapes tell. Is your shape tall and imposing, or wide and wrapping?"</p>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-emerald-100 shadow-sm text-slate-700">
          <h4 className="font-bold text-emerald-800 mb-3 text-lg underline decoration-emerald-200 underline-offset-4">2. Structural Planning & Blueprinting (15 min)</h4>
          <p className="text-sm text-slate-700 mb-4">Before touching materials, have students draw a "blueprint" of their composition. They should identify their <strong>focal point</strong> (the most important part of the art) and consider the <strong>scale</strong> (how big shapes are compared to each other).</p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-slate-600">
            <li>Where will the heaviest visual weight be placed?</li>
            <li>Will the shapes be connected, overlapping, or separated?</li>
          </ul>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-800 mb-4 text-lg underline decoration-emerald-200 underline-offset-4">3. Base Construction & Drafting (35 min)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/80 p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col h-full">
              <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-3 text-lg"><Box size={20}/> 3D Architecture Path</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">Distribute structural materials (cardboard, foam core, dowels). Demonstrate construction techniques:</p>
              <ul className="text-sm text-slate-600 list-disc ml-5 space-y-1 flex-grow">
                <li><strong>Slot & Tab:</strong> Cutting slits into two pieces of cardboard and sliding them together for an adhesive-free joint.</li>
                <li><strong>L-Braces:</strong> Scoring and folding cardboard to create structural "feet" that stand up.</li>
              </ul>
              <p className="text-xs font-bold text-emerald-700 mt-3 pt-3 border-t border-emerald-100">Goal: Build a freestanding base armature.</p>
            </div>
            <div className="bg-emerald-100/50 p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col h-full">
              <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-3 text-lg"><PenTool size={20}/> 2D & Digital Path</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">Distribute heavy mixed media paper or canvas boards. Have students lightly sketch their foundational layers:</p>
              <ul className="text-sm text-slate-600 list-disc ml-5 space-y-1 flex-grow">
                <li><strong>Horizon Lines:</strong> Establish where the ground meets the background.</li>
                <li><strong>Dominant Shapes:</strong> Use light graphite to block out the primary shapes from their blueprints.</li>
              </ul>
              <p className="text-xs font-bold text-emerald-700 mt-3 pt-3 border-t border-emerald-200">Goal: Map out the entire composition.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 3, title: "Make and Create", time: "60 Min", color: "bg-yellow-50 border-yellow-200", btnColor: "bg-yellow-600 hover:bg-yellow-700",
    objective: "Students will use color theory, shape, and physical texture to add emotional depth to their abstract art pieces.",
    slideUrl: "https://docs.google.com/presentation/d/1v-IyuTPCNI_jPSmMvk50hkc6hT_MwtgZ/copy",
    content: (
      <div className="space-y-6 text-left">
        <div className="bg-white/60 p-6 rounded-xl border border-yellow-100 shadow-sm text-sm">
          <h4 className="font-bold text-yellow-800 mb-3 text-lg underline decoration-yellow-200 underline-offset-4">1. Color and Emotion Mini-Lesson (15 min)</h4>
          <p className="text-slate-700 leading-relaxed mb-4">Discuss how artists use specific visual languages to communicate without words:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="font-bold text-yellow-900 mb-1">Color Temperature</p>
              <p className="text-xs text-slate-700"><strong>Warm colors</strong> (reds, oranges, yellows) can feel energetic, cozy, or urgent. <strong>Cool colors</strong> (blues, greens, purples) often feel calm, stable, or distant.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="font-bold text-yellow-900 mb-1">Implied vs. Real Texture</p>
              <p className="text-xs text-slate-700">Rough textures (burlap, torn edges) can show struggle or resilience. Smooth textures (silk, blended paint) can show comfort, peace, or flow.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-yellow-100 shadow-sm text-sm">
          <h4 className="font-bold text-yellow-800 mb-4 text-lg underline decoration-yellow-200 underline-offset-4">2. Independent Creation & Coaching (35 min)</h4>
          <p className="text-slate-700 mb-4">Students begin applying media to their foundational sketches/armatures. Circulate the room and ask probing questions about their choices.</p>
          <div className="space-y-4">
                <div className="p-4 bg-white/40 border border-slate-100 rounded-lg">
                <h5 className="font-bold text-sm uppercase text-yellow-900 mb-2 flex items-center gap-2"><Layers size={16}/> For Mixed Media & 3D:</h5>
                <p className="text-sm text-slate-600 leading-relaxed mb-2">Layer standard glue sticks with magazine cutouts, natural items, fabric, and tissue. Focus on creating physical depth.</p>
                <p className="text-xs italic text-slate-500">Teacher Tip: Show students how to "scrunch" bleeding tissue paper with watered-down glue to create hard, vibrant, organic textures.</p>
              </div>
              <div className="p-4 bg-white/40 border border-slate-100 rounded-lg text-left">
                <h5 className="font-bold text-sm uppercase text-yellow-900 mb-2 flex items-center gap-2"><Palette size={16}/> For Illustration & 2D:</h5>
                <p className="text-sm text-slate-600 leading-relaxed mb-2">Focus on value and shading. Use heavy, thick lines to show stability, or light, fluid lines to show growth and movement.</p>
                <p className="text-xs italic text-slate-500">Teacher Tip: Have students use oil pastels for their boldest lines, then paint over them with watercolors. The wax will resist the paint!</p>
              </div>
          </div>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-yellow-100 shadow-sm text-sm">
          <h4 className="font-bold text-yellow-800 mb-3 text-lg underline decoration-yellow-200 underline-offset-4">3. Mid-Point Peer Critique (10 min)</h4>
          <p className="text-slate-700 leading-relaxed">Have students do a brief, structured check-in with a partner. Prompt them to ask: <em>"What emotion do you feel when you look at my shapes and colors so far? Does it match my intended metaphor?"</em></p>
        </div>
      </div>
    )
  },
  {
    day: 4, title: "Artist Statements", time: "60 Min", color: "bg-teal-50 border-teal-200", btnColor: "bg-teal-600 hover:bg-teal-700",
    objective: "Students will articulate the meaning behind their artwork by writing a drafted 3-5 sentence Artist Statement.",
    slideUrl: "https://docs.google.com/presentation/d/1I9VgA7O6OXtPHbwk521HIP9FKXoRLQI5Qkum9HIkSU8/copy",
    content: (
      <div className="space-y-6 text-left">
        <div className="bg-white/60 p-6 rounded-xl border border-teal-100 shadow-sm">
          <h4 className="font-bold text-teal-800 mb-3 text-lg underline decoration-teal-200 underline-offset-4">1. Deconstructing an Artist Statement (10 min)</h4>
          <p className="text-sm text-slate-700 mb-4">Explain that because their art is abstract, the viewer needs a "key" to understand it. The Artist Statement is that key. It tells the viewer what the artist was feeling and why they made their specific choices.</p>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-teal-100 shadow-sm">
          <h4 className="font-bold text-teal-800 mb-3 text-lg underline decoration-teal-200 underline-offset-4">2. Brainstorming & Word Bank (15 min)</h4>
          <p className="text-sm text-slate-700 mb-4">On the whiteboard, have the class call out powerful adjectives and verbs related to their art. Create a visible Word Bank for them to use.</p>
          <div className="flex flex-wrap gap-2 mb-2">
             <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">Resilient</span>
             <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">Vibrant</span>
             <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">Anchored</span>
             <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">Soaring</span>
             <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">Protective</span>
             <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">Steady</span>
          </div>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-teal-100 shadow-sm">
          <h4 className="font-bold text-teal-800 mb-3 text-lg underline decoration-teal-200 underline-offset-4">3. Drafting the Statement (20 min)</h4>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">Have students combine their reflections into a cohesive 3-5 sentence paragraph. Provide these Sentence Frames on the board to scaffold the writing process for ALL learners:</p>
          <ul className="space-y-3 text-sm text-slate-700 bg-white p-4 rounded-lg border border-slate-200 font-mono">
            <li>"To me, strength feels like ______________."</li>
            <li>"I chose to represent my support system as a [Metaphor] because ______________."</li>
            <li>"In my artwork, the color [Color] symbolizes ______________."</li>
            <li>"I used [Texture/Shape] to show that ______________."</li>
          </ul>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-teal-100 shadow-sm">
          <h4 className="font-bold text-teal-800 mb-3 text-lg underline decoration-teal-200 underline-offset-4">4. Peer Review & Refinement (15 min)</h4>
          <p className="text-sm text-slate-700 leading-relaxed">Trade statements with a table group. Partners should read the statement while looking at the artwork, checking to ensure the written words match the visual feeling of the piece. Students make final spelling and grammar edits.</p>
        </div>
      </div>
    )
  },
  {
    day: 5, title: "Final Touches & Prep", time: "60 Min", color: "bg-emerald-50 border-emerald-200", btnColor: "bg-emerald-600 hover:bg-emerald-700",
    objective: "Provide dedicated time to finalize artwork and statements; prepare and execute a local classroom Gallery Walk.",
    content: (
      <div className="space-y-6 text-left">
        <div className="bg-white/60 p-6 rounded-xl border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-800 mb-3 text-lg underline decoration-emerald-200 underline-offset-4">1. The Finish Line & Craftsmanship (20 min)</h4>
          <p className="text-sm text-slate-700 mb-3">Discuss the importance of "Craftsmanship"—making sure the artwork looks purposeful and cared for.</p>
          <div className="space-y-2">
            <p className="text-sm text-slate-700 leading-relaxed"><strong className="text-emerald-900">Sculpture/3D:</strong> Ensure all pieces are firmly interlocked, structural details are complete, loose threads/hot glue strings are removed, and all wet media is fully dried.</p>
            <p className="text-sm text-slate-700 leading-relaxed"><strong className="text-emerald-900">Illustration/2D:</strong> Erase stray pencil marks, finalize borders, and mount the paper on black or heavy cardstock to create a clean, gallery-ready presentation frame.</p>
          </div>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-800 mb-3 text-lg underline decoration-emerald-200 underline-offset-4">2. Curatorial Labeling (10 min)</h4>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">Museums rely on curatorial tags to inform the public. Have students complete an official display label on an index card. It must include:</p>
          <ul className="list-disc ml-6 text-sm text-slate-600 space-y-1 mb-4 font-bold">
            <li>Artist Name</li>
            <li>Grade Level</li>
            <li>Title of the Artwork</li>
            <li>Medium Used (e.g., "Mixed Media on Cardboard")</li>
          </ul>
          <p className="text-sm text-slate-700">Attach the Curatorial Label and the typed/neatly written Artist Statement securely next to or below the artwork.</p>
        </div>

        <div className="bg-white/60 p-6 rounded-xl border border-emerald-100 shadow-sm">
          <div className="p-5 bg-emerald-100 rounded-lg border border-emerald-300 flex items-start gap-4">
            <QrCode size={32} className="text-emerald-700 shrink-0"/>
            <div className="w-full">
              <p className="text-sm font-bold text-emerald-800 mb-2 text-lg">3. The Gallery Walk Protocol (30 min)</p>
              <p className="text-sm text-emerald-900 leading-relaxed mb-3">Clear the center of the room or arrange the desks into a gallery perimeter. Use the "Half-and-Half" protocol:</p>
              <ul className="text-sm text-emerald-800 space-y-2 list-decimal ml-5 mb-4">
                <li><strong>Group A</strong> stands proudly by their artwork like museum docents.</li>
                <li><strong>Group B</strong> rotates through the gallery. They must stop at minimum three pieces and use the feedback stems below.</li>
                <li>After 10 minutes, swap groups so everyone gets to present and observe.</li>
              </ul>
              <div className="bg-white/60 p-3 rounded border border-emerald-200">
                <p className="text-xs font-bold text-emerald-900 mb-1">Feedback Stems for Viewers:</p>
                <p className="text-xs text-emerald-800">"I notice that you used [color/shape]..."<br/>"I wonder what inspired you to..."<br/>"Your artist statement really helped me understand..."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

const PROMO_CONTENT = {
  flyer: {
    title: "Flyer Copy & Layout Guide",
    icon: <LayoutTemplate size={24} className="text-teal-600" />,
    copyText: "ARTistic Expressions 2026\n\"What Gives Me Strength?\"\n\nJoin us for a student art showcase exploring resilience, support, and community.\n\n📅 Date: [Insert Date]\n⏰ Time: [Insert Time]\n📍 Location: [Insert Location]\n\nFeaturing abstract art, artist statements, and interactive community feedback.",
    content: (
      <div className="space-y-4 text-slate-700">
        <p className="italic text-sm">Use this copy in your preferred design tool (like Canva) to create your event flyers.</p>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-2xl font-black text-slate-900 text-center">ARTistic Expressions 2026</h3>
          <h4 className="text-lg text-teal-700 font-bold text-center">"What Gives Me Strength?"</h4>
          <p className="text-center font-bold text-sm">Join us for a student art showcase exploring resilience, support, and community.</p>
          <div className="border-t border-b border-slate-200 py-4 my-4 flex flex-col items-center gap-2 text-sm">
            <span className="font-bold text-slate-900">📅 Date: [Insert Date]</span>
            <span className="font-bold text-slate-900">⏰ Time: [Insert Time]</span>
            <span className="font-bold text-slate-900">📍 Location: [Insert Location]</span>
          </div>
          <p className="text-sm text-center text-slate-600">Featuring abstract art, artist statements, and interactive community feedback.</p>
        </div>
      </div>
    )
  },
  parentsquare: {
    title: "ParentSquare Announcement",
    icon: <Users size={24} className="text-teal-600" />,
    copyText: "Subject: 🎨 You're Invited: \"What Gives Me Strength?\" Art Showcase!\n\nDear Families,\n\nWe are incredibly proud to invite you to celebrate the creativity and resilience of our student artists at our upcoming ARTistic Expressions 2026 Showcase!\n\nOver the past few weeks, our students have been exploring the theme \"What Gives Me Strength?\" Instead of drawing literal objects, they have learned how to use abstract art, colors, shapes, and metaphors to represent the people, places, and values that support them when life gets challenging.\n\nWe would love for you to join us to view their beautiful, vulnerable, and powerful artwork.\n\nEvent Details:\n- Date: [Insert Date]\n- Time: [Insert Time]\n- Location: [Insert Location, e.g., School Library / MPR / Courtyard]\n- Format: [Insert Format, e.g., Formal Gallery Walk / Morning Coffee & Art / Interactive Walkthrough]\n\nDuring the event, you will have the opportunity to read the students' Artist Statements and leave positive, encouraging feedback for our young creators.\n\nWe can't wait to share this inspiring experience with our community. See you there!\n\nWarmly,\n[Your Name/Title]\n[School Name]",
    content: (
      <div className="space-y-4 text-slate-700 text-sm">
        <p className="italic text-xs text-slate-500 mb-4">Instructions: Copy and paste this text into ParentSquare or your school newsletter. Be sure to fill in the bracketed information before sending!</p>
        
        <p><strong>Subject:</strong> 🎨 You're Invited: "What Gives Me Strength?" Art Showcase!</p>
        
        <p>Dear Families,</p>
        
        <p>We are incredibly proud to invite you to celebrate the creativity and resilience of our student artists at our upcoming <strong>ARTistic Expressions 2026 Showcase</strong>!</p>
        
        <p>Over the past few weeks, our students have been exploring the theme <em>"What Gives Me Strength?"</em> Instead of drawing literal objects, they have learned how to use abstract art, colors, shapes, and metaphors to represent the people, places, and values that support them when life gets challenging.</p>
        
        <p>We would love for you to join us to view their beautiful, vulnerable, and powerful artwork.</p>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="font-bold mb-2">Event Details:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Date:</strong> [Insert Date]</li>
            <li><strong>Time:</strong> [Insert Time]</li>
            <li><strong>Location:</strong> [Insert Location, e.g., School Library / MPR / Courtyard]</li>
            <li><strong>Format:</strong> [Insert Format, e.g., Formal Gallery Walk / Morning Coffee & Art / Interactive Walkthrough]</li>
          </ul>
        </div>
        
        <p>During the event, you will have the opportunity to read the students' Artist Statements and leave positive, encouraging feedback for our young creators.</p>
        
        <p>We can't wait to share this inspiring experience with our community. See you there!</p>
        
        <p>Warmly,<br/>[Your Name/Title]<br/>[School Name]</p>
      </div>
    )
  },
  tags: {
    title: "Curatorial Display Tags",
    icon: <FileText size={24} className="text-teal-600" />,
    copyText: "[Student First Name, Last Initial]\nGrade [Number]\n\nTitle: [Student's chosen title, e.g., \"The Quiet Anchor\"]\nMedium: [e.g., Mixed Media on Canvas / Watercolor and Ink]\n\nArtist Statement: \"[Insert the student's 3-5 sentence artist statement here. E.g., 'To me, strength feels like a deep root. I chose to represent my support system as a tree because it keeps me grounded...']\"",
    content: (
      <div className="space-y-4 text-slate-700 text-sm">
        <p className="italic text-xs text-slate-500">Instructions: Use this format to create uniform, museum-style labels for each student's artwork. Print them on heavy index cards.</p>
        
        <div className="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm w-full max-w-sm mx-auto space-y-3">
          <div>
            <p className="font-black text-slate-900 text-lg leading-none">[Student First Name, Last Initial]</p>
            <p className="italic text-slate-500 text-xs">Grade [Number]</p>
          </div>
          
          <div className="pt-2 border-t border-slate-100">
            <p><strong>Title:</strong> <em>[Student's chosen title, e.g., "The Quiet Anchor"]</em></p>
            <p><strong>Medium:</strong> <em>[e.g., Mixed Media on Canvas / Watercolor and Ink]</em></p>
          </div>
          
          <div className="pt-2">
            <p className="text-xs leading-relaxed text-slate-600">
              <strong>Artist Statement:</strong> "[Insert the student's 3-5 sentence artist statement here. E.g., 'To me, strength feels like a deep root. I chose to represent my support system as a tree because it keeps me grounded...']"
            </p>
          </div>
        </div>
      </div>
    )
  },
  feedback: {
    title: "Feedback Station Prompts",
    icon: <MessageSquare size={24} className="text-teal-600" />,
    copyText: "Station 1: The \"Notice\" Station\nWhat do you see?\nAbstract art is all about the details! Take a close look at the artwork and use these sentence starters to leave a note for the artist:\n- \"I notice that you used a lot of [color/shape/texture]...\"\n- \"My eyes were immediately drawn to...\"\n- \"I noticed how you connected the shapes by...\"\n\nStation 2: The \"Wonder\" Station\nWhat are you curious about?\nArtists make deliberate choices. Ask the artist about their process:\n- \"I wonder what inspired you to choose the [Metaphor] to represent your strength?\"\n- \"I wonder how you created that specific texture...\"\n- \"I wonder what you were feeling when you painted the...\"\n\nStation 3: The \"Connection\" Station\nHow does the art make you feel?\nArt is meant to evoke emotion. Share your emotional response with the artist:\n- \"Looking at your artwork makes me feel [calm/energized/safe] because...\"\n- \"This piece reminds me of a time when I had to be strong, because...\"\n- \"Your artist statement really helped me understand...\"\n\nStation 4: Quick Praise Cards\nShort, sweet, and encouraging!\n- \"Your use of color is incredibly powerful!\"\n- \"You showed amazing bravery in sharing your story.\"\n- \"This is a beautiful representation of resilience.\"\n- \"Your artist statement matches the feeling of your art perfectly.\"",
    content: (
      <div className="space-y-6 text-slate-700 text-sm">
        <p className="italic text-xs text-slate-500">Instructions: Print these prompts on cardstock and place them on tables, walls, or near a "Feedback Station" equipped with sticky notes and pens. These sentence stems help parents and peers engage meaningfully with abstract art.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
            <h5 className="font-bold text-teal-900 mb-1 border-b border-teal-200 pb-2">Station 1: The "Notice" Station</h5>
            <p className="font-bold text-xs text-teal-700 mb-2 mt-2">What do you see?</p>
            <p className="text-xs mb-2">Abstract art is all about the details! Take a close look at the artwork and use these sentence starters to leave a note for the artist:</p>
            <ul className="list-disc ml-5 text-xs space-y-1">
              <li>"I notice that you used a lot of [color/shape/texture]..."</li>
              <li>"My eyes were immediately drawn to..."</li>
              <li>"I noticed how you connected the shapes by..."</li>
            </ul>
          </div>
          
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <h5 className="font-bold text-emerald-900 mb-1 border-b border-emerald-200 pb-2">Station 2: The "Wonder" Station</h5>
            <p className="font-bold text-xs text-emerald-700 mb-2 mt-2">What are you curious about?</p>
            <p className="text-xs mb-2">Artists make deliberate choices. Ask the artist about their process:</p>
            <ul className="list-disc ml-5 text-xs space-y-1">
              <li>"I wonder what inspired you to choose the [Metaphor] to represent your strength?"</li>
              <li>"I wonder how you created that specific texture..."</li>
              <li>"I wonder what you were feeling when you painted the..."</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
            <h5 className="font-bold text-yellow-900 mb-1 border-b border-yellow-200 pb-2">Station 3: The "Connection" Station</h5>
            <p className="font-bold text-xs text-yellow-700 mb-2 mt-2">How does the art make you feel?</p>
            <p className="text-xs mb-2">Art is meant to evoke emotion. Share your emotional response with the artist:</p>
            <ul className="list-disc ml-5 text-xs space-y-1">
              <li>"Looking at your artwork makes me feel [calm/energized/safe] because..."</li>
              <li>"This piece reminds me of a time when I had to be strong, because..."</li>
              <li>"Your artist statement really helped me understand..."</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
            <h5 className="font-bold text-purple-900 mb-1 border-b border-purple-200 pb-2">Station 4: Quick Praise Cards</h5>
            <p className="font-bold text-xs text-purple-700 mb-2 mt-2">Short, sweet, and encouraging!</p>
            <ul className="list-disc ml-5 text-xs space-y-1">
              <li>"Your use of color is incredibly powerful!"</li>
              <li>"You showed amazing bravery in sharing your story."</li>
              <li>"This is a beautiful representation of resilience."</li>
              <li>"Your artist statement matches the feeling of your art perfectly."</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
};

// --- COMPONENTS ---
const APSealFacsimile = () => (
  <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-inner w-full max-w-[200px] mx-auto">
    <svg width="100%" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="95" fill="#fff" stroke="#334155" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#334155" strokeWidth="1" />
      <text x="100" y="125" fontSize="82" fontWeight="900" fontFamily="serif" textAnchor="middle" fill="#1e293b" style={{ letterSpacing: "-4px" }}>AP</text>
      <defs>
        <path id="acmiCurve" d="M 45,100 A 55,55 0 0,1 155,100" />
        <path id="bottomCurve" d="M 35,130 A 70,70 0 0,0 165,130" />
      </defs>
      <text fontSize="20" fontWeight="bold" fontFamily="sans-serif" fill="#1e293b">
        <textPath href="#acmiCurve" startOffset="50%" textAnchor="middle">ACMI</textPath>
      </text>
      <text fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="#475569">
        <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">ART & CREATIVE MATERIALS INSTITUTE CERTIFIED</textPath>
      </text>
      
      {/* Placed fully below the circle at y=215 */}
      <text x="100" y="215" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fill="#334155">
        <tspan x="100" dy="0">Conforms to</tspan>
        <tspan x="100" dy="16" fontWeight="bold">ASTM D 4236</tspan>
      </text>
    </svg>
    <p className="mt-3 text-[9px] uppercase font-black text-slate-400 tracking-widest text-center">Safety Certification Facsimile</p>
  </div>
);

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="relative group inline-block">
      <button 
        onClick={handleCopy}
        className="p-2 text-slate-400 hover:text-teal-600 bg-slate-50 border border-slate-200 hover:border-teal-200 hover:bg-teal-50 rounded-full shadow-sm transition-all flex items-center justify-center"
      >
        {copied ? <Check size={20} className="text-teal-600"/> : <Copy size={20} />}
      </button>
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-max max-w-[200px] bg-slate-800 text-white text-xs py-1.5 px-3 rounded shadow-lg pointer-events-none z-50 text-center">
        Click to copy text and paste into a document
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('classroom');
  const [activeDay, setActiveDay] = useState(null);
  const [activeMetaphor, setActiveMetaphor] = useState(null);
  const [toolkitTab, setToolkitTab] = useState('trauma');
  const [activeFaq, setActiveFaq] = useState(null); 
  const [activePromo, setActivePromo] = useState(null);
  
  const [generatedImages, setGeneratedImages] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);
  const [error, setError] = useState(null);

  // Leave empty for this preview environment. 
  // When running on Vercel, you can swap this to: import.meta.env.VITE_GEMINI_API_KEY
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // --- Move FAQS inside so it can use setActiveTab ---
  const FAQS = [
    { 
      id: 'supplies', question: "Do we receive art kits?", icon: <Box size={20} />, 
      answer: "No pre-packaged kits are provided this year. A $250 budget per participating Teacher is available. You should work with your Principal or the principal's designee (e.g., secretary) to order the supplies through Amazon. A blanket purchase order is available when the secretaries are provided the details. Check out the Supply Procurement Hub in the Supplies & Safety tab for ideas of what to acquire." 
    },
    { 
      id: 'showcase', question: "How is the showcase handled?", icon: <ImageIcon size={20} />, 
      answer: (
        <>
          Site events are optional. A site-based Gallery Walk is the recommended format to celebrate student work with the school community. For great ideas and step-by-step guides, please visit our <button onClick={() => setActiveTab('showcases')} className="text-teal-600 hover:underline font-bold transition">Local Showcases</button> page.
        </>
      )
    },
    {
      id: 'payment', question: "How do teachers get paid?", icon: <Clock size={20} />,
      answer: "Complete the time log linked in the header of the website and submit it based on the timelines emailed to the participating teachers. The timeline can also be found on the time log. Once completed, print it out, sign it, get your principal's signature, scan it, and email it to gsarkisordukhanian@gusd.net."
    },
    {
      id: 'resources', question: "Are there resources for teaching abstract art?", icon: <Lightbulb size={20} />,
      answer: (
        <>
          Yes! If you are new to guiding abstract art projects, we highly recommend the{' '}
          <a href="https://www.artic.edu/educator-resources/121/artful-encounters-short-and-informative-videos-for-educators-and-students" target="_blank" rel="noreferrer" className="text-teal-600 hover:underline font-medium">Artful Encounters</a>
          {' '}videos from the Art Institute of Chicago, as well as the comprehensive educator resources at{' '}
          <a href="https://www.tate.org.uk/schools/resources" target="_blank" rel="noreferrer" className="text-teal-600 hover:underline font-medium">Tate Kids</a>
          . Don't forget to lean on the Arts Learning Leaders at your school—they are fantastic collaborative partners for brainstorming age-appropriate instructional modifications.
        </>
      )
    }
  ];

  const toggleDay = (day) => setActiveDay(activeDay === day ? null : day);
  const toggleMetaphor = (id) => setActiveMetaphor(activeMetaphor === id ? null : id);

  // Helper with Exponential backoff to comply with network reliability rules
  const fetchWithRetry = async (url, options, retries = 5) => {
    let delay = 1000;
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
      }
    }
  };

  const fetchImage = async (id, prompt) => {
    setLoadingImage(true);
    setError(null);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instances: [{ prompt }], parameters: { sampleCount: 1 } })
      };
      
      const result = await fetchWithRetry(url, options);
      
      if (result.error) {
        throw new Error(result.error.message || "Google API Error");
      }
      
      setGeneratedImages(prev => ({ ...prev, [id]: `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}` }));
    } catch (err) { 
      console.error("Image generation error:", err);
      setError("The image generator is currently busy or experiencing network errors. Please try again."); 
    } finally { 
      setLoadingImage(false); 
    }
  };

  const activeLesson = LESSON_PLANS.find(l => l.day === activeDay);

  return (
    <div className="min-h-screen bg-[#f8fafb] font-sans text-slate-800 text-left">
      {/* BRAND HEADER */}
      <header className="bg-slate-900 text-white py-12 px-6 border-b-8 border-teal-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 text-left">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-600 p-2 rounded-lg"><Paintbrush className="text-white" size={24} /></div>
              <span className="uppercase tracking-[0.3em] font-bold text-teal-400 text-xs">Glendale Unified School District</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-3 italic tracking-tight">ARTistic Expressions 2026</h1>
            <p className="text-slate-400 text-xl font-light tracking-wide">"What Gives Me Strength?"</p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <a href="https://docs.google.com/document/d/19H6-CZewfT42j-_7dKlzKELGDzvdhMe0zKJCX32HBEo/copy" target="_blank" rel="noreferrer" className="flex items-center justify-center bg-white text-slate-900 px-6 py-3 rounded-xl font-bold shadow-xl hover:bg-slate-100 transition"><Clock className="mr-2 text-teal-600" size={18}/> Compensation Time Log</a>
            <a href="https://www.gusd.net/arts" target="_blank" rel="noreferrer" className="flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:bg-teal-700 transition"><Palette className="mr-2" size={18}/> GUSD VAPA</a>
          </div>
        </div>
      </header>

      {/* NAV SYSTEM */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex justify-center md:justify-start overflow-x-auto">
          <div className="flex gap-8 lg:gap-12 min-w-max">
            <button onClick={() => setActiveTab('classroom')} className={`py-6 px-2 text-sm font-black uppercase tracking-widest transition-all border-b-4 whitespace-nowrap ${activeTab === 'classroom' ? 'border-teal-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Lessons</button>
            <button onClick={() => setActiveTab('strategies')} className={`py-6 px-2 text-sm font-black uppercase tracking-widest transition-all border-b-4 whitespace-nowrap ${activeTab === 'strategies' ? 'border-teal-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Strategies</button>
            <button onClick={() => setActiveTab('showcases')} className={`py-6 px-2 text-sm font-black uppercase tracking-widest transition-all border-b-4 whitespace-nowrap ${activeTab === 'showcases' ? 'border-teal-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Local Showcases</button>
            <button onClick={() => setActiveTab('supplies')} className={`py-6 px-2 text-sm font-black uppercase tracking-widest transition-all border-b-4 whitespace-nowrap ${activeTab === 'supplies' ? 'border-teal-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Supplies & Safety</button>
            <button onClick={() => setActiveTab('faqs')} className={`py-6 px-2 text-sm font-black uppercase tracking-widest transition-all border-b-4 whitespace-nowrap ${activeTab === 'faqs' ? 'border-teal-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>FAQs</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 lg:p-12">
        {activeTab === 'classroom' && (
          <div className="space-y-16 animate-fade-in">
            {/* RECRUITMENT CARD */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-8">
              <div className="bg-teal-50 p-6 rounded-3xl text-teal-600"><UserPlus size={48}/></div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-black mb-2">Student Recruitment</h3>
                <p className="text-slate-500 text-base leading-relaxed">Invite students at your site to explore personal narratives. Site-specific dates and location entries are required before student distribution.</p>
              </div>
              <a href="https://drive.google.com/file/d/1VRm1sLu9qeXngnmypZVXPsU7iB6fgyf2/view?usp=sharing" target="_blank" rel="noreferrer" className="bg-slate-900 text-white px-10 py-4 w-full md:w-auto rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition text-center whitespace-nowrap">Get Flyer</a>
            </div>

            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-slate-200 flex-grow" />
                <h2 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3"><Clock className="text-teal-600"/> Lessons</h2>
                <div className="h-px bg-slate-200 flex-grow" />
              </div>

              <div className="mb-10 text-center max-w-3xl mx-auto">
                <p className="text-slate-600 text-lg leading-relaxed bg-white/50 p-6 rounded-2xl border border-slate-200 shadow-sm italic">
                  These lessons are provided as a resource, not a requirement. Please feel free to adjust the activities or follow your own instructional process to best support your students' unique expressions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4 space-y-4">
                  {LESSON_PLANS.map((lp) => (
                    <button key={lp.day} onClick={() => toggleDay(lp.day)} className={`w-full text-left p-6 rounded-2xl border-2 transition-all group flex items-center justify-between ${activeDay === lp.day ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-[1.02]' : 'bg-white border-slate-100 hover:border-teal-200 text-slate-700'}`}>
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${activeDay === lp.day ? 'bg-teal-600 text-white' : 'bg-slate-50'}`}>{lp.day}</div>
                        <div>
                          <span className="block text-[10px] uppercase font-bold tracking-widest opacity-60">Session</span>
                          <span className="font-bold text-lg leading-tight">{lp.title}</span>
                        </div>
                      </div>
                      <ChevronRight size={20} className={activeDay === lp.day ? 'text-teal-400' : 'text-slate-300'} />
                    </button>
                  ))}
                </div>
                <div className="lg:col-span-8">
                  {activeLesson ? (
                    <div className={`rounded-[2.5rem] p-6 sm:p-10 border-2 shadow-sm animate-fade-in text-left ${activeLesson.color}`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900">{activeLesson.title}</h3>
                        <span className="bg-white/50 px-6 py-2 rounded-full text-xs font-black text-slate-700 border border-white/50 uppercase tracking-widest shadow-sm whitespace-nowrap">{activeLesson.time}</span>
                      </div>
                      
                      <div className="bg-white/90 p-6 rounded-2xl border border-white mb-8 shadow-sm">
                        <h6 className="text-[10px] font-black uppercase text-teal-700 mb-2 tracking-widest">Instructional Objective</h6>
                        <p className="text-lg sm:text-xl text-slate-800 font-medium leading-relaxed mb-6">{activeLesson.objective}</p>
                        
                        {activeLesson.slideUrl && (
                          <a href={activeLesson.slideUrl} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center text-white px-6 py-3 rounded-xl font-bold gap-2 transition shadow-md w-full sm:w-auto ${activeLesson.btnColor}`}>
                            <Presentation size={20}/> View Slide Deck
                          </a>
                        )}
                      </div>
                      
                      <div className="bg-white/80 p-6 sm:p-8 rounded-3xl border border-white shadow-inner">
                        {activeLesson.content}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                      <Clock className="text-slate-200 mb-6" size={80} />
                      <p className="text-slate-400 font-bold text-xl">Select a session on the left to explore the path.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-16 animate-fade-in">
            
            {/* INSTRUCTIONAL FOUNDATIONS HERO */}
            <div className="mb-12 max-w-4xl space-y-6">
              <h2 className="text-4xl font-black text-slate-900">Teaching Strategies</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Introducing the theme for the unit will also require the need to establish an understanding of abstract art.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Establish the Theme */}
              <div className="bg-teal-600 p-8 sm:p-10 rounded-[3rem] shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                  <Lightbulb size={200} />
                </div>
                <div className="relative z-10 mb-8">
                  <div className="bg-teal-500/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Presentation size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Establish the Theme</h3>
                  <p className="text-teal-50 leading-relaxed text-lg mb-8">
                    The slide deck can be used to establish the overall theme of "What gives me strength?" with your students.
                  </p>
                </div>
                <a href="https://docs.google.com/presentation/d/1lirIthosxBehU_7ZBqy38MB3nS7aM6QlP7AMaD_TtNk/copy" target="_blank" rel="noreferrer" className="relative z-10 bg-white text-teal-900 px-6 py-4 rounded-xl font-bold shadow-lg hover:bg-teal-50 transition flex items-center justify-center gap-3 text-center">
                  Intro Theme Slides
                </a>
              </div>

              {/* Understand Abstract Art */}
              <div className="bg-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                  <Palette size={200} />
                </div>
                <div className="relative z-10 mb-8">
                  <div className="bg-slate-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white">
                    <Layers size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Understand Abstract Art</h3>
                  <p className="text-slate-300 leading-relaxed text-lg mb-8">
                    The thematic development section below is a more detailed approach to introducing abstract art, differentiated for two general developmental stages.
                  </p>
                </div>
                <button onClick={() => document.getElementById('thematic-guide')?.scrollIntoView({ behavior: 'smooth' })} className="relative z-10 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-xl font-bold hover:bg-white/20 transition flex items-center justify-center gap-3 text-center">
                  Explore the Guide Below
                </button>
              </div>
            </div>

            {/* THEMATIC DEVELOPMENT SECTION */}
            <section id="thematic-guide" className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl text-left scroll-mt-24">
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Thematic Development Guide</h2>
                <p className="text-slate-500 text-lg">Step-by-step instructional pathways to bridge the gap between literal objects and personal strength.</p>
              </div>
              
              <div className="space-y-12">
                {/* 3rd & 4th Grade Approach */}
                <div className="bg-emerald-50/30 p-6 sm:p-10 rounded-[2rem] border border-emerald-100 shadow-sm">
                  <div className="border-b border-emerald-200 pb-6 mb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-emerald-500 p-3 rounded-xl text-white shadow-md"><Shield size={28} /></div>
                      <h3 className="text-3xl font-black text-slate-900">3rd & 4th Grade Approach</h3>
                    </div>
                    <p className="text-emerald-700 font-bold uppercase tracking-widest text-sm mb-2">Concrete Operational (Physical Protection)</p>
                    <p className="text-slate-600"><strong>Instructional Focus:</strong> Guide students to find physical barriers, weight, and literal defense. Students at this age understand strength as "something that blocks force."</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Step 1 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                      <h4 className="font-black text-lg text-slate-900 mb-3 flex items-center gap-2"><Search size={20} className="text-emerald-500"/> Step 1: Concept Exploration</h4>
                      <div className="text-sm text-slate-700 space-y-3 flex-grow">
                        <p><strong>What to do:</strong> Lead a "Strength Scavenger Hunt." Instruct students to look around the room and find an object that looks like it could survive a massive storm (e.g., a brick wall, a heavy metal locker).</p>
                        <p><strong>Student Action:</strong> Give students a crayon and thin paper. Instruct them to take a physical texture rubbing of the object they found to capture the literal surface of strength.</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-yellow-600 block mb-1">GATE Tip:</strong> Ask, "What is the smallest single thing vital for strength?" Have them diagram a tiny piece (like a latch).</div>
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-blue-600 block mb-1">EL Tip:</strong> Provide a verb bank (Blocks, Supports, Holds). Ask the student, "Which verb does your object do best?"</div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                      <h4 className="font-black text-lg text-slate-900 mb-3 flex items-center gap-2"><Palette size={20} className="text-emerald-500"/> Step 2: Color-Value Mapping</h4>
                      <div className="text-sm text-slate-700 space-y-3 flex-grow">
                        <p><strong>What to do:</strong> Break the cliché that "light is weak" and "dark is strong." Teach students to directly translate specific moods to colors.</p>
                        <p><strong>Student Action:</strong> Have students draw a 2x2 "Mood Grid" on scratch paper. Instruct them to assign one color to each quadrant: <em>Family Strength</em> (e.g., orange), <em>Brave Strength</em> (deep red), <em>Calm Strength</em> (soft blue), and <em>Play Strength</em> (bright green).</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-yellow-600 block mb-1">GATE Tip:</strong> Map "Brave Scared." Instruct them to find two contrasting colors to overlap and blend (e.g., orange for bravery + purple for fear).</div>
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-blue-600 block mb-1">EL Tip:</strong> Post descriptive adjectives on the board: Vibrant, Cheerful, Steady, Protective.</div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                      <h4 className="font-black text-lg text-slate-900 mb-3 flex items-center gap-2"><MessageSquare size={20} className="text-emerald-500"/> Step 3: Dialogue & Metaphor</h4>
                      <div className="text-sm text-slate-700 space-y-3 flex-grow">
                        <p><strong>What to do:</strong> Help students translate physical objects into environmental experiences using direct similes.</p>
                        <p><strong>Student Action:</strong> Ask the class: "If your support system were simple weather, what is it? Is it a big hug from the sun, or an umbrella?" Have them complete the sentence frame: <em>"My strength is like _______ because it makes me feel _______."</em></p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-yellow-600 block mb-1">GATE Tip:</strong> Encourage Sequential Similes: "It is like a calm morning until my brother makes me mad, then it is like lightning."</div>
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-blue-600 block mb-1">EL Tip:</strong> Explicitly model similes. Provide a list of nouns (Umbrella, Shield) and adjectives (Warm, Strong) for them to match.</div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                      <h4 className="font-black text-lg text-slate-900 mb-3 flex items-center gap-2"><Layers size={20} className="text-emerald-500"/> Step 4: Creative Application</h4>
                      <div className="text-sm text-slate-700 space-y-3 flex-grow">
                        <p><strong>What to do:</strong> Guide students to create a centralized symbol of protection (a shield, an anchor, a wall).</p>
                        <p><strong>Student Action:</strong> Instruct students to draw their central shape. Have them fill it with the colors from their "Mood Grid" (Step 2) and collage their physical texture rubbings (Step 1) directly onto the symbol to show a literal block of force.</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-yellow-600 block mb-1">GATE Tip:</strong> Instruct them to draw "The Power of Keeping a Secret" without using a literal shield shape. Push for an interlocking pattern.</div>
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-blue-600 block mb-1">EL Tip:</strong> Ensure the simplified simile (from Step 3) serves as their primary written explanation on their display tag.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5th & 6th Grade Approach */}
                <div className="bg-indigo-50/30 p-6 sm:p-10 rounded-[2rem] border border-indigo-100 shadow-sm mt-12">
                  <div className="border-b border-indigo-200 pb-6 mb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-indigo-500 p-3 rounded-xl text-white shadow-md"><Zap size={28} /></div>
                      <h3 className="text-3xl font-black text-slate-900">5th & 6th Grade Approach</h3>
                    </div>
                    <p className="text-indigo-700 font-bold uppercase tracking-widest text-sm mb-2">Formal Operational (Structural Integrity)</p>
                    <p className="text-slate-600"><strong>Instructional Focus:</strong> Guide students to analyze complex systems, interlocking parts, and invisible force (tension). Students at this age understand strength as "how parts work together."</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Step 1 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                      <h4 className="font-black text-lg text-slate-900 mb-3 flex items-center gap-2"><Search size={20} className="text-indigo-500"/> Step 1: Concept Exploration</h4>
                      <div className="text-sm text-slate-700 space-y-3 flex-grow">
                        <p><strong>What to do:</strong> Lead a "Structural Scavenger Hunt." Instruct students to find an object where two parts are joined to create something stronger than either part alone (e.g., a door hinge, a metal weld, a woven rope).</p>
                        <p><strong>Student Action:</strong> Have students sketch the mechanism of the connection. Instruct them to "Draw how the hinge pivots" or "Draw how the rope fibers are twisted together" to understand internal structure.</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-yellow-600 block mb-1">GATE Tip:</strong> Ask, "Does the strength come from mass or tension?" Have them explore geometry vs. thickness (e.g., a spiderweb).</div>
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-blue-600 block mb-1">EL Tip:</strong> Write academic nouns on the board: Mechanism, Tension, Compression, Structure, Geometry.</div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                      <h4 className="font-black text-lg text-slate-900 mb-3 flex items-center gap-2"><Palette size={20} className="text-indigo-500"/> Step 2: Color-Value Mapping</h4>
                      <div className="text-sm text-slate-700 space-y-3 flex-grow">
                        <p><strong>What to do:</strong> Focus on color interaction, value, and opacity to show that strength has nuance and changes over time.</p>
                        <p><strong>Student Action:</strong> Introduce "The Gradient of Power." Instruct students to use watercolors or pastels to create transitions on paper. Have them practice showing how strength can be subtle or overwhelming (e.g., a sad navy blue fading into a determined teal).</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-yellow-600 block mb-1">GATE Tip:</strong> Challenge them with Paradoxical Palettes: "How do you paint 'Tired Strength'?" Push for a non-cliché answer.</div>
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-blue-600 block mb-1">EL Tip:</strong> Supply complex adjectives: Luminous, Diffused, Resilient, Overpowering, Muted.</div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                      <h4 className="font-black text-lg text-slate-900 mb-3 flex items-center gap-2"><MessageSquare size={20} className="text-indigo-500"/> Step 3: Dialogue & Metaphor</h4>
                      <div className="text-sm text-slate-700 space-y-3 flex-grow">
                        <p><strong>What to do:</strong> Move students from direct similes to complex, conceptual systems of metaphor.</p>
                        <p><strong>Student Action:</strong> Ask the class: "Is your strength the weather itself, or the structure affected by the weather? Are you the tornado, or the roots keeping the tree grounded?" Have them complete the frame: <em>"While the world outside feels like _______, my internal strength functions as a _______."</em></p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-yellow-600 block mb-1">GATE Tip:</strong> Require a transformational metaphor. E.g., "It starts as a controlled burn that clears dead wood so new life can grow."</div>
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-blue-600 block mb-1">EL Tip:</strong> Allow students to brainstorm complex concepts deeply in their native language first, then translate it into English.</div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                      <h4 className="font-black text-lg text-slate-900 mb-3 flex items-center gap-2"><Layers size={20} className="text-indigo-500"/> Step 4: Creative Application</h4>
                      <div className="text-sm text-slate-700 space-y-3 flex-grow">
                        <p><strong>What to do:</strong> Guide students to create an abstract environment showing tension and interlocking parts (rather than a single object).</p>
                        <p><strong>Student Action:</strong> Instruct students to paint/draw abstract interlocking geometric shapes or woven networks. They must <em>imitate</em> the structural diagrams (from Step 1) using paint or charcoal to show depth, and utilize their color gradients (from Step 2) for the background atmosphere.</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-yellow-600 block mb-1">GATE Tip:</strong> Instruct them to "Design a bridge made of light and shadow" to push abstract structural thinking.</div>
                        <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100"><strong className="text-blue-600 block mb-1">EL Tip:</strong> Have students visually embed their academic 'Strength Word' (e.g., FORTITUDE) directly into the woven textures of the art.</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* METAPHOR LAB */}
            <section className="bg-slate-900 text-white p-6 sm:p-10 lg:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="text-4xl font-black mb-4">Metaphor Lab</h2>
                  <p className="text-slate-400 text-lg">Select a metaphor to generate a visual conceptualization of strength.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                  {METAPHORS.map((m) => (
                    <button key={m.id} onClick={() => toggleMetaphor(m.id)} className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${activeMetaphor === m.id ? 'bg-teal-600 text-white shadow-lg scale-105' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                      <div className="mb-3">{m.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">{m.label}</span>
                    </button>
                  ))}
                </div>
                
                {activeMetaphor && (
                  <div className="bg-white text-slate-900 rounded-[2rem] overflow-hidden shadow-2xl animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="p-8 sm:p-10 space-y-8">
                        <div className="flex items-center gap-4">
                           <div className="bg-teal-600 p-4 rounded-2xl text-white shadow-lg">{METAPHORS.find(m => m.id === activeMetaphor).icon}</div>
                           <h3 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight">The {activeMetaphor}</h3>
                        </div>
                        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light">{METAPHORS.find(m => m.id === activeMetaphor).description}</p>
                        
                        {error && (
                          <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 text-sm font-medium border border-red-100">
                             <AlertCircle className="shrink-0" size={20} />
                             <p>{error}</p>
                          </div>
                        )}
                        
                        <button onClick={() => fetchImage(activeMetaphor, METAPHORS.find(m => m.id === activeMetaphor).prompt)} disabled={loadingImage} className="flex items-center justify-center gap-4 bg-slate-900 text-white w-full py-5 rounded-2xl font-bold shadow-xl hover:bg-teal-700 transition disabled:opacity-50">
                          {loadingImage ? <Loader2 className="animate-spin" size={24} /> : <RefreshCw size={24} />}
                          {generatedImages[activeMetaphor] ? "Regenerate Visual" : "Generate Visual Example"}
                        </button>
                      </div>
                      <div className="bg-slate-100 min-h-[300px] lg:min-h-[450px] flex items-center justify-center p-6 shadow-inner relative">
                        {loadingImage ? (
                          <div className="text-center space-y-6">
                            <ImageIcon className="mx-auto text-slate-300 animate-pulse" size={80} />
                            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Architecting Inspiration...</p>
                          </div>
                        ) : generatedImages[activeMetaphor] ? (
                          <div className="w-full h-full animate-fade-in group relative rounded-2xl overflow-hidden">
                            <img src={generatedImages[activeMetaphor]} alt={activeMetaphor} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          </div>
                        ) : (
                          <div className="text-center text-slate-400 space-y-4 max-w-xs mx-auto">
                            <Palette size={80} className="mx-auto opacity-20" />
                            <p className="font-bold text-lg opacity-40">Ready for Visual Input</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* INCLUSION TOOLKIT */}
            <section className="bg-white p-1 rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
              <div className="p-8 sm:p-10 border-b border-slate-50 bg-teal-50/30">
                <div className="flex items-center gap-4 mb-2">
                  <Heart className="text-teal-600" size={32} />
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Inclusion and Differentiation Toolkit</h2>
                </div>
                <p className="text-slate-500 text-base sm:text-lg">Universal Design for Learning (UDL) strategies for every Glendale classroom.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row border-b border-slate-100 bg-white">
                {['trauma', 'gate', 'english', 'diverse'].map(tab => (
                  <button key={tab} onClick={() => setToolkitTab(tab)} className={`flex-1 py-4 sm:py-6 px-4 text-xs font-black uppercase tracking-widest transition-all ${toolkitTab === tab ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 border-b sm:border-b-0 sm:border-r border-slate-100'}`}>
                    {tab === 'trauma' ? 'Trauma-Informed' : tab === 'gate' ? 'GATE Learners' : tab === 'english' ? 'English Learners' : 'Diverse Abilities'}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-10 animate-fade-in min-h-[350px]">
                {toolkitTab === 'trauma' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Shield size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Relational & Internal Safety</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Provide support options like "the fire inside me" or "the library where I feel safe." This avoids triggers for students who may have unstable home lives. Focus on tools used to stay standing.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><EyeOff size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Regulatory Environment</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Abstraction is a protective layer. Reassure students they have full agency over revealing the symbolic meaning of their shapes during the Gallery Walk. Art can remain a private sanctuary.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Heart size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Predictability & Choice</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Provide clear visual schedules for the art block. Offer a "pass" option if students are uncomfortable sharing the meaning behind their artwork during group critiques.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Layers size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Titration of Emotion</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">If a student begins to feel overwhelmed, guide them to focus strictly on present-day resilience rather than past hardship. Ask: "What color keeps you steady today?"</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Box size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Sensory Grounding</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Provide heavy, tactile materials (like modeling clay or thick corrugated cardboard). Firm pressure and heavy work provide proprioceptive feedback that helps ground the nervous system.</p>
                    </div>
                  </div>
                )}
                {toolkitTab === 'gate' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Sparkles size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Depth & Complexity</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Challenge advanced learners to represent contradictory strengths. Can a support system be both an "Anchor" (limiting) and a "River" (moving)? Ask them to build a 3D join that shows this tension.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><UserCheck size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Affective Support</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Introduce artists like Hilma af Klint or Wassily Kandinsky. Have students research how they used color and line as a 'vocabulary' for invisible feelings. Include an 'Artist Influences' section in statements.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Zap size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Material Innovation</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Encourage students to push the boundaries of provided materials. Can they weave cardboard? Can they create a freestanding 3D sculpture without any adhesive by using tension and balance?</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Search size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Divergent Paradoxes</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Focus on divergent thinking. If the class is drawing "stability," ask the GATE student to define "liquid stability." Make them iterate until they find a paradox.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><RefreshCw size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Iterative Design</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Don't let them settle for the first metaphor they find. Require a draft that explores the exact opposite feeling before finalizing their primary design choice.</p>
                    </div>
                  </div>
                )}
                {toolkitTab === 'english' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Languages size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Linguistic Scaffolding</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Use icons as primary language. Provide "Emotion Vocabulary Cards" that translate feeling words into home languages. Use Total Physical Response by demonstrating textures while naming them.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><FileText size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Structured Output</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Provide specific stems for Day 4: "I chose the [Metaphor] because it feels like [Support]." Encourage dual-language labels next to their final pieces.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><ImageIcon size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Visual Anchor Charts</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Maintain a visible 'Word Wall' featuring dual-language terms alongside sketches of the concepts (e.g., a drawing of an anchor next to the words 'Stable / Estable').</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Lightbulb size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Cognitive Equality</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Never mistake a language barrier for a cognitive barrier. EL students have "High-Ceiling" thoughts but "Low-Floor" English. Visual rubrics allow them to express intellectual depth without limits.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><CheckCircle2 size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Cognate Mapping</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Leverage high-level cognates directly in instruction. Map English academic words to Spanish roots (e.g., Tenacity/Tenacidad, Robust/Robusto, Resilient/Resiliente).</p>
                    </div>
                  </div>
                )}
                {toolkitTab === 'diverse' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Accessibility size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Sensory & Motor Access</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">For motor challenges, provide larger foam rollers or adaptive paintbrush grips. For tactile sensitivities, offer glue sticks and precut shapes to avoid wet media or scissors.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Stethoscope size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Executive Support</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Provide a "Limited Palette" of two colors and two textures to start. Build confidence in those choices before expanding to the full kit. Provide 3-step checklists to navigate open-ended art.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Monitor size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Means of Expression</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Allow students to record a brief audio or video explanation of their piece if drafting a written Artist Statement presents a cognitive or physical barrier.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Layers size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Adaptive Boundaries</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Use painter's tape to create physical, high-contrast borders on the canvas or desk surface so students with visual/motor challenges feel safe painting boldly.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col">
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"><Box size={20}/></div>
                      <h4 className="text-xl font-black mb-3">Simplified Choice Matrices</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">Offer a explicit 'This or That' choice board for materials to prevent choice paralysis. "Would you like the thick rope or the thin string?" rather than an open supply bin.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'showcases' && (
          <div className="space-y-16 animate-fade-in text-left">
            {/* HERO SECTION */}
            <div className="bg-white p-8 sm:p-12 rounded-[3rem] border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-8 lg:gap-12 text-center md:text-left">
              <div className="bg-teal-50 p-8 rounded-full text-teal-600 shrink-0">
                <Star size={64}/>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Site-Based Showcases</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We highly encourage each school site to celebrate their students' artistic reflections on resilience. Choose a showcase format that best fits your school's culture, space, and community engagement goals.
                </p>
              </div>
            </div>

            {/* THREE IDEAS SECTION */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <Lightbulb className="text-yellow-500" size={28}/> Event Concept Ideas
              </h3>

              {/* IDEA 1 */}
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
                <div className="bg-teal-600 p-8 lg:w-1/3 flex flex-col justify-center text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <ImageIcon size={200} />
                  </div>
                  <h4 className="text-2xl font-black mb-2 relative z-10">The Formal "Gallery Walk"</h4>
                  <p className="text-teal-100 font-medium relative z-10">High Impact / Traditional Event</p>
                  <p className="mt-4 text-sm text-teal-50 leading-relaxed relative z-10">Transform your school library or MPR into a dignified art gallery during an existing event (e.g., Open House, PTA Meeting). Focuses on quiet reflection and honoring student vulnerability.</p>
                </div>
                <div className="p-8 lg:w-2/3 space-y-6">
                  <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Implementation Steps</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500"/> 1. Preparation</p>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">Mount 2D artwork on black butcher paper or heavy cardstock to create faux "mattes." Print uniform Curatorial Tags for all pieces.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500"/> 2. Staging</p>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">Use library tables for 3D art and easels/walls for 2D art. Dim the overhead lights and play soft ambient or instrumental music.</p>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <p className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500"/> 3. Execution</p>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">Utilize the "Half-and-Half Protocol." Have half the student artists stand next to their work as "Docents" to explain their metaphor, while parents and the other half of students walk the gallery. Swap after 20 minutes.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* IDEA 2 */}
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
                <div className="bg-yellow-500 p-8 lg:w-1/3 flex flex-col justify-center text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Coffee size={200} />
                  </div>
                  <h4 className="text-2xl font-black mb-2 relative z-10">Art & Morning Coffee</h4>
                  <p className="text-yellow-100 font-medium relative z-10">Casual / Community Building</p>
                  <p className="mt-4 text-sm text-yellow-50 leading-relaxed relative z-10">A relaxed, highly accessible morning mixer right after school drop-off. Ideal for outdoor courtyards or cafeterias to catch parents who might not attend evening events.</p>
                </div>
                <div className="p-8 lg:w-2/3 space-y-6">
                  <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Implementation Steps</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-yellow-600"/> 1. Preparation</p>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">Collaborate with your site PTA to sponsor coffee, tea, and light pastries. Set a date 2-3 weeks in advance and heavily promote it at the drop-off gate.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-yellow-600"/> 2. Staging</p>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">Create a "clothesline gallery" by pinning artwork to string across the courtyard, or use chain-link fences. Set up casual standing tables.</p>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <p className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-yellow-600"/> 3. Execution</p>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">Host a 45-minute drop-in session. Set up an "Interactive Feedback Wall" where parents can write positive notes on sticky notes and leave them next to artworks that moved them.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* IDEA 3 */}
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
                <div className="bg-slate-800 p-8 lg:w-1/3 flex flex-col justify-center text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <QrCode size={200} />
                  </div>
                  <h4 className="text-2xl font-black mb-2 relative z-10">QR Code Campus Trail</h4>
                  <p className="text-slate-300 font-medium relative z-10">Tech-Forward / Extended Reach</p>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed relative z-10">Physical art is kept safe in classrooms, but high-res photos are put into a digital gallery. QR codes are posted strategically around the campus for parents to scan asynchronously.</p>
                </div>
                <div className="p-8 lg:w-2/3 space-y-6">
                  <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Implementation Steps</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-500"/> 1. Preparation</p>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">Have students or parent volunteers take clear, well-lit photos of the finished artwork and their artist statements. Compile these into a shared Google Slides presentation or Google Site.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-500"/> 2. Staging</p>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">Generate a free QR code linking to the digital gallery. Print, laminate, and post these QR flyers at high-traffic zones (main office windows, car-line pickup areas, kindergarten gates).</p>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <p className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-500"/> 3. Execution</p>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">Send out a ParentSquare blast inviting the community to "Walk the Trail." This allows working parents to view the art on their own time straight from their phones while waiting for their students.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROMOTIONAL TOOLKIT */}
            <div className="bg-teal-50/50 p-8 sm:p-12 rounded-[3rem] border border-teal-100 shadow-inner mt-16">
              <div className="mb-8 text-center max-w-2xl mx-auto">
                <Megaphone className="text-teal-600 mx-auto mb-4" size={40} />
                <h3 className="text-3xl font-black text-slate-900 mb-4">Promotional Toolkit</h3>
                <p className="text-slate-600">Click below to view and copy standard materials to promote your local showcase and ease the burden of event planning.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button onClick={() => setActivePromo('flyer')} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col items-center text-center group">
                  <div className="bg-teal-100 p-4 rounded-xl text-teal-700 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <LayoutTemplate size={28} />
                  </div>
                  <span className="font-bold text-slate-800 mb-1">Event Flyer Copy</span>
                  <span className="text-xs text-slate-500">Customizable event details</span>
                  <span className="mt-4 text-[10px] uppercase font-black tracking-widest text-teal-600 flex items-center gap-1">View Draft</span>
                </button>

                <button onClick={() => setActivePromo('parentsquare')} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col items-center text-center group">
                  <div className="bg-teal-100 p-4 rounded-xl text-teal-700 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Users size={28} />
                  </div>
                  <span className="font-bold text-slate-800 mb-1">ParentSquare Blurb</span>
                  <span className="text-xs text-slate-500">Copy/paste announcement text</span>
                  <span className="mt-4 text-[10px] uppercase font-black tracking-widest text-teal-600 flex items-center gap-1">View Draft</span>
                </button>

                <button onClick={() => setActivePromo('tags')} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col items-center text-center group">
                  <div className="bg-teal-100 p-4 rounded-xl text-teal-700 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <FileText size={28} />
                  </div>
                  <span className="font-bold text-slate-800 mb-1">Curatorial Display Tags</span>
                  <span className="text-xs text-slate-500">Printable museum-style labels</span>
                  <span className="mt-4 text-[10px] uppercase font-black tracking-widest text-teal-600 flex items-center gap-1">View Template</span>
                </button>

                <button onClick={() => setActivePromo('feedback')} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col items-center text-center group">
                  <div className="bg-teal-100 p-4 rounded-xl text-teal-700 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <MessageSquare size={28} />
                  </div>
                  <span className="font-bold text-slate-800 mb-1">Feedback Prompts</span>
                  <span className="text-xs text-slate-500">"I notice/I wonder" station signs</span>
                  <span className="mt-4 text-[10px] uppercase font-black tracking-widest text-teal-600 flex items-center gap-1">View Prompts</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'supplies' && (
          <div className="space-y-16 animate-fade-in text-left">
            {/* REORGANIZED SUPPLY HUB */}
            <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-100 shadow-xl">
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <ShoppingBag className="text-teal-600 mx-auto mb-4" size={40} />
                <h3 className="text-3xl font-black text-slate-900 mb-4">Supply Procurement Hub</h3>
                <p className="text-slate-600">Please work with your Principal or Principal's designee to acquire needed supplies. These categories are designed to support broad mixed-media exploration.</p>
              </div>

              {/* Grid layout replaces the old tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
                {EXTENDED_SUPPLIES.map((cat) => (
                  <div key={cat.id} className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-200">
                      <div className="bg-white p-3 rounded-2xl text-teal-600 shadow-sm group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <h4 className="text-xl font-black text-slate-900">{cat.title}</h4>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {cat.items.map((it, i) => (
                        <li key={i} className="text-base text-slate-700 flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-teal-500 shrink-0 mt-1" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white p-4 rounded-xl border border-yellow-200 text-sm italic text-slate-600 flex items-start gap-3 mt-auto">
                      <Lightbulb size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{cat.tip}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* SAFETY SECTION */}
              <div className="bg-slate-900 text-white p-8 sm:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                <div className="w-full lg:w-1/3 shrink-0">
                  <APSealFacsimile />
                </div>
                <div className="w-full lg:w-2/3 text-center lg:text-left space-y-4">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                     <ShieldAlert size={36} className="text-teal-400" />
                     <h4 className="text-3xl font-black">Supply Safety Guarantee</h4>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    For all classroom art supplies, ensure you look for the <strong>AP (Approved Product) Seal</strong> from the Art and Creative Materials Institute (ACMI).
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    Products bearing the AP seal are certified in a toxicological evaluation by a medical expert to contain no materials in sufficient quantities to be toxic or injurious to humans, including children.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-16 animate-fade-in text-left">
            {/* INSTRUCTIONAL FAQS */}
            <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-xl">
               <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-teal-900 text-center">Instructional Hub FAQs</h2>
                <p className="text-slate-600 text-center mt-2">Quick answers regarding logistics.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FAQS.map((faq) => (
                  <div 
                    key={faq.id} 
                    onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)} 
                    className="cursor-pointer bg-slate-50 p-6 rounded-3xl border-2 border-transparent transition-all shadow-sm hover:shadow-md hover:border-teal-100"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-teal-600 shrink-0">{faq.icon}</div>
                        <h4 className="font-bold text-base text-slate-800">{faq.question}</h4>
                      </div>
                      <div className="text-slate-400 shrink-0">
                        {activeFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    {activeFaq === faq.id && (
                      <div className="mt-4 pt-4 border-t border-slate-200 cursor-auto" onClick={(e) => e.stopPropagation()}>
                        <p className="text-base text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

      </main>

      <footer className="bg-slate-900 text-white py-16 sm:py-20 px-6 border-t-[12px] border-teal-600 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <Paintbrush size={60} className="text-teal-500 mb-8 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-center">ARTistic Expressions 2026</h2>
          <p className="text-slate-400 text-lg sm:text-xl font-light mb-12 text-center">"Celebrating the strength and resilience of every student artist."</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 sm:gap-12 w-full sm:w-auto">
            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 w-full sm:w-auto">
              <Mail size={24} className="text-teal-500 shrink-0" />
              <div>
                <span className="block font-black text-teal-400 uppercase tracking-widest text-[10px]">Instructional Support</span>
                <a href="mailto:eahangarzadeh@gusd.net" className="text-sm sm:text-base hover:text-teal-400 transition break-all">eahangarzadeh@gusd.net</a>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 w-full sm:w-auto">
              <Mail size={24} className="text-teal-500 shrink-0" />
              <div>
                <span className="block font-black text-teal-400 uppercase tracking-widest text-[10px]">Email Time Logs To</span>
                <a href="mailto:gsarkisordukhanian@gusd.net" className="text-sm sm:text-base hover:text-teal-400 transition break-all">gsarkisordukhanian@gusd.net</a>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-20 pt-8 border-t border-white/5 w-full text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">
              &copy; 2025-2026 Glendale Unified School District. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* PROMO MODAL */}
      {activePromo && PROMO_CONTENT[activePromo] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActivePromo(null)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col relative z-10 animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {PROMO_CONTENT[activePromo].icon}
                <h3 className="text-xl font-black text-slate-900">{PROMO_CONTENT[activePromo].title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <CopyButton text={PROMO_CONTENT[activePromo].copyText} />
                <div className="h-8 w-px bg-slate-200"></div>
                <button onClick={() => setActivePromo(null)} className="text-slate-400 hover:text-slate-700 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto">
              {PROMO_CONTENT[activePromo].content}
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex justify-end">
              <button onClick={() => setActivePromo(null)} className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-slate-800 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}