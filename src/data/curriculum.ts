export interface Lesson {
  day: number;
  title: string;
  lesson: string;
  task: string;
  aiFeedbackPrompt: string;
}

export interface Phase {
  name: string;
  emoji: string;
  days: string;
  color: "green" | "blue" | "purple" | "orange" | "gold";
  lessons: Lesson[];
}

export const curriculum: Phase[] = [
  {
    name: "Foundations",
    emoji: "✏️",
    days: "1–9",
    color: "green",
    lessons: [
      {
        day: 1,
        title: "Your First Lines",
        lesson:
          "Drawing is about seeing, not talent. Every mark you make trains your hand-eye connection. Lines have character — they can be confident or hesitant, flowing or rigid. The goal today isn't perfection; it's getting comfortable making marks on paper. Hold your pencil loosely, about two-thirds down the barrel, and let your whole arm move — not just your wrist.",
        task:
          "Fill a full page with lines: 20 straight horizontal lines, 20 vertical lines, 10 curved lines, 10 wavy lines, and a few spiraling from small to large. Don't lift your pencil between marks — keep moving.",
        aiFeedbackPrompt:
          "Evaluate line confidence, consistency of pressure, and variety. Note whether lines are hesitant or fluid, and whether the student varied line weight.",
      },
      {
        day: 2,
        title: "Seeing Shapes",
        lesson:
          "Everything around you — a bottle, a chair, a face — is made from simple shapes: circles, squares, triangles, and rectangles. Artists call this 'seeing through' an object. When you break complex things into basic shapes, drawing becomes much more manageable. Look at any object and ask: what shapes make this up?",
        task:
          "Draw 10 everyday objects as simple shapes. Try: a mug (cylinder + handle circle), a book (rectangle), an apple (circle + triangle stem), a lamp (triangle + rectangle), a phone (rounded rectangle). Stick to flat shapes for now — no shading.",
        aiFeedbackPrompt:
          "Check shape simplification accuracy, proportion of basic forms relative to each other, and whether the student is capturing the essential geometry of each object.",
      },
      {
        day: 3,
        title: "Contour Drawing",
        lesson:
          "Contour drawing trains your eye to move in sync with your hand. The rule: look at the object, not the paper. Imagine your pencil is a tiny ant crawling along every edge and wrinkle of what you see — let your hand follow that journey. The result will be messy and imperfect, and that's exactly right. This exercise is about observation, not a clean drawing.",
        task:
          "Do a blind contour drawing of your non-dominant hand. Spend 5 full minutes. Your hand must not look at the paper — keep your eyes only on your hand as you draw. Try a second version where you can glance at the paper occasionally.",
        aiFeedbackPrompt:
          "Assess line flow and continuity, quality of observation (does the drawing show careful attention to edges?), and willingness to be messy. Penalize erasing.",
      },
      {
        day: 4,
        title: "The Ellipse",
        lesson:
          "When you tilt a circle away from you, it becomes an ellipse. This is one of the most important forms in drawing — it appears on cylinders (cups, bottles, cans), wheels, and anywhere you see a circle in perspective. A perfect ellipse has two axes: a long axis and a short axis that cross at right angles. The key skill is drawing smooth, consistent ellipses without any flat edges or pointy ends.",
        task:
          "Fill a page with 20 ellipses of varying widths (from nearly circular to very thin) and different angles. For each one, lightly mark the long axis first, then draw the ellipse around it. Try to make each stroke smooth in a single motion.",
        aiFeedbackPrompt:
          "Evaluate ellipse consistency, smoothness (no flat spots or pointed ends), accuracy of angle variation, and whether axes are symmetrical.",
      },
      {
        day: 5,
        title: "Boxes Everywhere",
        lesson:
          "The box — or rectangular prism — is the skeleton of nearly every man-made object. Mastering boxes unlocks: buildings, furniture, phones, cars, and even characters. In 2-point perspective, a box has two vanishing points on the horizon line. Lines on the top and bottom of each face converge toward those points. Today we'll practice the feel of boxes in space.",
        task:
          "Draw 10 boxes in different orientations and sizes. Some should look like they're viewed from above, some from below, some head-on. Try making boxes that are tall and thin, short and wide, and cube-shaped. Don't worry about rulers — freehand is the goal.",
        aiFeedbackPrompt:
          "Check vanishing point consistency (do parallel edges converge believably?), box solidity (does it feel 3D?), and variety of orientations.",
      },
      {
        day: 6,
        title: "Cylinders & Spheres",
        lesson:
          "Round forms add life and warmth to mechanical shapes. A cylinder is a rectangle wrapped around two ellipses — one on top and one on the bottom. The top ellipse and bottom ellipse should match in width, but the bottom ellipse is often slightly wider due to perspective. A sphere is deceptively simple but difficult to render convincingly — we'll use light and shadow to give it mass.",
        task:
          "Draw 10 cylinders (try different proportions: short and squat, tall and thin) and 5 spheres. For each one, add a simple light source from the upper left and shade the shadow side. Add a cast shadow beneath each form.",
        aiFeedbackPrompt:
          "Evaluate form volume (do the shapes feel 3D?), ellipse quality on cylinders, value separation (light vs. shadow), and cast shadow direction consistency.",
      },
      {
        day: 7,
        title: "Gesture Lines",
        lesson:
          "Gesture drawing captures the energy, weight, and movement of a pose — not the details. A gesture line is often called the 'line of action': the main curve that runs through the body and gives it dynamism. Think of it like the spine of a drawing. You're not drawing a person; you're drawing the feeling of movement. 30 seconds is intentionally short — it forces you to prioritize what matters.",
        task:
          "Find a figure reference online (search 'gesture drawing reference' or use Line of Action). Draw 10 quick gesture figures, spending exactly 30 seconds on each. Focus only on the line of action and major shapes — arms, legs, and torso as simple strokes.",
        aiFeedbackPrompt:
          "Assess line of action clarity, pose readability at a glance, energy and flow of the gesture, and whether the student is avoiding over-detailing.",
      },
      {
        day: 8,
        title: "Form Construction",
        lesson:
          "Construction is the method professional artists use to build complex subjects from simple forms. Instead of drawing a chair by copying its outline, you build it: a box for the seat, cylinders for the legs, rectangles for the back. This mental model lets you draw anything from any angle, even from imagination. Today you'll practice building real objects with a construction mindset.",
        task:
          "Draw a chair, a mug, and a shoe using primitive construction. For each: first sketch the underlying primitive forms (boxes, cylinders, spheres), then refine the outline over those forms. Keep the construction lines light — don't erase them.",
        aiFeedbackPrompt:
          "Evaluate construction logic (are primitives being used as scaffolding?), form overlap and spatial relationships, and whether the final objects read correctly in 3D space.",
      },
      {
        day: 9,
        title: "Phase 1 Review",
        lesson:
          "You've covered lines, shapes, contour, ellipses, boxes, round forms, gesture, and construction. Now it's time to combine everything in one drawing from life. Drawing from observation — a real object in front of you — is the fastest way to improve. Look for shapes, look for light and dark, look for where forms overlap. Don't copy; construct.",
        task:
          "Set up a still life of 3 objects from your environment (e.g., a mug, a book, and a fruit). Spend 20 minutes drawing them using the construction method: block in simple shapes first, then refine. Add basic light and shadow at the end.",
        aiFeedbackPrompt:
          "Assess overall construction quality, perspective and proportion, form relationships in space, and line quality across all forms.",
      },
    ],
  },
  {
    name: "Proportions",
    emoji: "📐",
    days: "10–18",
    color: "blue",
    lessons: [
      {
        day: 10,
        title: "The Measuring Stick",
        lesson:
          "Proportion is comparing sizes. Your pencil is your ruler: hold it at arm's length, close one eye, and align the tip with the top of your subject. Use your thumb to mark the bottom. That length becomes your unit of measurement — now compare it to the width, to other objects, to distances between features. This technique is used by professional artists and painters. It sounds mechanical, but it trains your eye to see relationships accurately.",
        task:
          "Set up a book and a bottle near each other. Before drawing, measure: How tall is the bottle compared to the book? How wide? Draw both objects, checking proportions with your pencil every few minutes. Your goal is accuracy, not style.",
        aiFeedbackPrompt:
          "Evaluate proportion accuracy (do relative sizes match the reference?), whether measurement technique was applied visibly in the drawing, and overall size relationships.",
      },
      {
        day: 11,
        title: "Head Proportions",
        lesson:
          "The human head follows reliable proportions that make it easier to draw. The classic Loomis method: the head is an egg shape. Eyes sit halfway between the top of the skull and the chin — not halfway down the head (the skull takes more space than you think). The nose sits halfway between the eyes and the chin. The mouth sits one-third of the way between nose and chin. These are landmarks, not rigid rules.",
        task:
          "Draw 5 front-view heads using the Loomis method. Start with a circle, flatten the bottom into a jaw, then lightly draw the horizontal center line (eyes), the nose line, and the mouth line. Place simplified features at each landmark. No detail needed — just proportions.",
        aiFeedbackPrompt:
          "Check eye line placement (should be at vertical midpoint of head), nose and mouth line spacing, facial symmetry around vertical center, and overall head shape.",
      },
      {
        day: 12,
        title: "Profile View",
        lesson:
          "The side view of the head reveals depth and the relationship between the face and skull. In profile, the head is roughly as deep front-to-back as it is tall. The ear sits at the center of the head from side to side, and aligns vertically with the nose and eyebrow. The jaw angles sharply from the chin to the ear. These relationships are subtle but consistent across most faces.",
        task:
          "Draw 5 profile heads with light construction lines visible. Use the same proportions from Day 11 but adapt for the side view. Place the ear at the horizontal center of the head, and make sure the back of the skull has enough volume — beginners often flatten it.",
        aiFeedbackPrompt:
          "Assess profile proportion accuracy (nose/forehead/chin relationship), ear placement, skull volume behind the ear, and jaw angle.",
      },
      {
        day: 13,
        title: "Angles & Alignment",
        lesson:
          "Objects in the world are rarely perfectly vertical or horizontal. When drawing complex scenes, use imaginary plumb lines (vertical) and level lines (horizontal) to check whether points in your drawing align correctly. Hold your pencil vertically or horizontally and note what lines up — what's directly above what, what's on the same level. This technique fixes the most common proportion errors.",
        task:
          "Draw a chair and a desk together. Before drawing, use imaginary plumb lines: is the left leg of the chair directly below the left armrest? Use level lines: is the desk top on the same horizontal as the chair back? Check and re-check as you draw.",
        aiFeedbackPrompt:
          "Evaluate angle accuracy and alignment of key structural points, whether plumb/level checking is evident in the drawing, and overall compositional straightness.",
      },
      {
        day: 14,
        title: "The Figure: 8 Heads",
        lesson:
          "A heroic standing figure is traditionally drawn as 8 heads tall (stylized anatomy). Realistic figures are closer to 7–7.5 heads. Use this as a measuring grid: head 1 is the head itself, heads 2–3 cover the torso, head 4 reaches the hips, heads 5–6 cover the thighs, heads 7–8 are the lower leg and feet. This system lets you scale a figure correctly on any page.",
        task:
          "Draw 3 standing figures using the 8-heads proportion system. First draw 8 equal boxes stacked vertically. Then loosely sketch the figure using those boxes as guides: head fits in box 1, hips at box 4, feet at box 8. Keep the figures simple stick-gestures with block masses.",
        aiFeedbackPrompt:
          "Check figure height consistency (is it close to 8 head units?), head-unit ratio at key landmarks (hips at 4, knees at 6), and limb length proportionality.",
      },
      {
        day: 15,
        title: "Negative Space",
        lesson:
          "Negative space is the space around and between objects — the 'empty' areas. When you draw the negative shapes instead of the object itself, you bypass your brain's symbol-making habit (which makes chairs look like your mental symbol of a chair, not the real chair). Drawing negative space forces pure observation. It's uncomfortable but profoundly effective.",
        task:
          "Find a chair with visible gaps in its structure (between the legs, between the back slats). Draw only the negative shapes — the holes and gaps around the chair. Don't draw the chair itself, just its surrounding spaces. The chair should emerge from your drawing as a result.",
        aiFeedbackPrompt:
          "Assess negative space shape accuracy, whether the object 'appears' correctly from the negative shapes, and quality of observation compared to the reference.",
      },
      {
        day: 16,
        title: "Comparing Sizes",
        lesson:
          "In a complex scene, use one object as your unit of measurement for everything else. The smallest significant object becomes '1 unit.' Now measure: is the lamp 3 units tall? Is the table 5 units wide? Using consistent internal measurement keeps your whole drawing in proportion even without rulers. This is the core skill of plein air and observational drawing.",
        task:
          "Arrange a small still life with at least 4 objects of different sizes. Choose the smallest as your base unit. Measure every other object against it before drawing. Write the ratios lightly beside each object as you work (e.g., 'bottle = 3x mug height').",
        aiFeedbackPrompt:
          "Evaluate relative sizing accuracy across all objects, measurement consistency through the drawing, and whether size relationships feel believable.",
      },
      {
        day: 17,
        title: "Plumb Lines & Level",
        lesson:
          "Architecture, interiors, and furniture rely on vertical and horizontal relationships. A single tilted vertical ruins the feeling of solidity. Plumb lines help you check if structural elements are truly vertical. Level lines help confirm horizontal relationships. Used together, they're a powerful error-catching system for any complex drawing.",
        task:
          "Draw a building facade or a room corner with furniture. As you work, frequently check verticals with a pencil held straight up. Check horizontals with a pencil held flat. Correct any elements that drift from true vertical or horizontal.",
        aiFeedbackPrompt:
          "Check vertical and horizontal alignment accuracy, structural straightness, and overall architectural believability.",
      },
      {
        day: 18,
        title: "Phase 2 Review",
        lesson:
          "Proportion is the hidden skill of great realist drawing. When a drawing 'looks off,' it's almost always a proportion problem. Today you'll apply all your proportion tools to a full figure from photo reference: measuring with your pencil, using 8-head units, checking plumb lines, comparing parts to each other.",
        task:
          "Find a full-body photo reference of a person standing. Spend 30 minutes drawing them with careful attention to proportion. Use your pencil to measure constantly. Check: is the head the right size? Are the legs the right length? Is one shoulder higher than the other?",
        aiFeedbackPrompt:
          "Evaluate overall proportion accuracy (head size, torso-to-leg ratio, limb lengths), shoulder and hip alignment, and whether the figure reads as well-proportioned.",
      },
    ],
  },
  {
    name: "Anatomy Lite",
    emoji: "🦴",
    days: "19–27",
    color: "purple",
    lessons: [
      {
        day: 19,
        title: "The Skeleton Frame",
        lesson:
          "Bones create the landmarks and limits of the human figure. You don't need to memorize every bone — just the key landmarks that show through the skin: the collarbone, shoulder blades, sternum, rib cage, pelvis, knees, ankles, and wrists. The 'bean figure' simplifies the skeleton into two major masses (rib cage and pelvis) connected by a flexible spine, with stick limbs.",
        task:
          "Draw a simplified skeleton from the front and side view — the 'bean figure.' The rib cage is a rounded rectangle, the pelvis is a wider, flatter box. Connect them with a curved spine. Add stick limbs with dots at the joints. Front and side, each at least 6 inches tall.",
        aiFeedbackPrompt:
          "Assess skeleton structure accuracy (rib cage vs. pelvis proportions), joint placement, and overall figure proportions.",
      },
      {
        day: 20,
        title: "The Torso: Ribcage & Hips",
        lesson:
          "The torso is two masses connected by a flexible waist. The rib cage is an egg-shaped mass that slopes slightly backward. The pelvis is a bowl shape that tilts forward. When the body bends, twists, or leans, these two masses move in opposite directions — if the rib cage tips right, the pelvis tips left (contrapposto). Understanding this relationship makes figures feel alive and dynamic.",
        task:
          "Draw 10 torsos showing the rib cage and pelvis as separate simplified forms. Vary the angles: some upright, some bent forward, some twisted, some in contrapposto. Show the waist compression and stretch between the two masses.",
        aiFeedbackPrompt:
          "Evaluate rib cage and pelvis angle relationships, waist compression on the bent side, stretch on the opposite side, and whether the two masses feel connected.",
      },
      {
        day: 21,
        title: "Arms & Legs: Tubes & Joints",
        lesson:
          "Limbs are chains of tapered cylinders with hinge joints. The upper arm (bicep/tricep) tapers from shoulder to elbow. The forearm (two bones that rotate) is thinner. Joints are the key: the elbow is a complex hinge that only bends one way. The knee is similar. Drawing joints as slightly widened knobs helps them look believable. The key error to avoid: making limbs the same width all the way down.",
        task:
          "Draw 10 arms (front and back views, different poses) and 10 legs (straight, bent at knee, crossing). Focus on the taper from shoulder to wrist and hip to ankle. Exaggerate joint knobs slightly to make them read clearly.",
        aiFeedbackPrompt:
          "Check taper direction and degree in arms and legs, joint placement and believability, overlap of forms at bent joints, and overall limb proportion.",
      },
      {
        day: 22,
        title: "Hands Simplified",
        lesson:
          "Hands are notoriously difficult because they're complex, they move, and we see them constantly so errors are obvious. The simplification: the palm is a box (roughly square), the four fingers are tubes of three segments each (decreasing in length toward the pinky), and the thumb is a separate tube that opposes the fingers. The key insight: the fingers fan out from the knuckles, not straight.",
        task:
          "Draw 10 hand gestures using the box + tube method. Try: open flat hand, fist, pointing, holding a cup, pinching, thumbs up, and side view. Rough boxes and tubes first — no fingernails until the structure is right.",
        aiFeedbackPrompt:
          "Evaluate palm box proportion, finger length hierarchy (index longest, ring slightly shorter, pinky shortest), thumb placement and opposition, and overall gesture readability.",
      },
      {
        day: 23,
        title: "Feet Simplified",
        lesson:
          "Feet are wedges — wide at the toes, narrow at the heel, with the ankle sitting above the inner arch. The toes fan out from the ball of the foot, with the big toe often angled slightly inward. From the side, the foot is a right-angle wedge with an arch underneath. From the front, the toes step down from the big toe to the pinky, forming a subtle curve.",
        task:
          "Draw 10 feet from at least 4 different angles: side view, front view, back view (heel only), three-quarter view, top-down, and from below. Use wedge construction for all of them. Add toes as simple tubes last.",
        aiFeedbackPrompt:
          "Assess foot wedge angle, arch placement, toe fan direction, ankle height (inner ankle is higher than outer), and overall form believability.",
      },
      {
        day: 24,
        title: "The Neck & Shoulders",
        lesson:
          "The neck is a cylinder that doesn't sit vertically — it angles slightly forward. The shoulders are a wide yoke of muscle (trapezius) draped over the top of the rib cage, connecting to the neck on each side. The trapezius slopes from the neck down to the shoulder tips. This slope is what makes the shoulder area feel muscular and real. A common mistake: drawing the neck too thin and centered — it connects to the front of the rib cage, not the top.",
        task:
          "Draw 10 neck and shoulder connections from different angles: front, back, three-quarter, and side. Show the trapezius as a triangular muscle sloping from neck to shoulder. Include the collarbone as a horizontal line on the front view.",
        aiFeedbackPrompt:
          "Evaluate neck width (should be wider than beginners typically draw), shoulder slope from trapezius, collarbone placement, and the overall connection between neck and torso.",
      },
      {
        day: 25,
        title: "Faces: Features",
        lesson:
          "Feature placement is everything in portraiture. The rules: eyes sit at the halfway point vertically on the head (most people draw them too high). The nose bottom sits halfway between the eyes and chin. The mouth sits one-third of the way from the nose to the chin. The ears align vertically between the eyebrow and the nose bottom. Width-wise: the face is five 'eye widths' wide, with one eye-width between the eyes, and a half eye-width on each side.",
        task:
          "Draw 10 faces focusing only on feature placement — no detail, no style. Draw the guide lines first (eye line, nose line, mouth line, center line). Place simple shapes at each landmark. Check your placement before adding any detail.",
        aiFeedbackPrompt:
          "Check eye line position (vertical midpoint of head), nose line spacing, mouth line position, ear vertical alignment, and eye spacing (five eyes across the face width).",
      },
      {
        day: 26,
        title: "Expressions",
        lesson:
          "Expressions are the result of facial muscles pushing and pulling skin around the eyes and mouth. Happy: cheeks push up, eyes narrow at the bottom, mouth curves up and widens. Angry: brows push down and together, mouth tightens or opens wide. Surprised: brows raise, eyes and mouth open wide. Sad: inner brows raise (creating an 'upside-down V'), mouth curves down. Each expression changes the overall shape of the face as much as the individual features.",
        task:
          "Draw 6 expressions using the same face shape: happy, sad, angry, surprised, tired, and scared. For each, start with the brow shape first — it sets the entire mood. Then do the eyes, then the mouth. Show clearly how each expression changes the whole face.",
        aiFeedbackPrompt:
          "Evaluate expressiveness and readability of each emotion, eyebrow shape and position, eye openness, mouth shape accuracy, and whether the whole face participates in each expression (not just isolated features).",
      },
      {
        day: 27,
        title: "Phase 3 Review",
        lesson:
          "You've studied the skeleton, torso masses, limbs, hands, feet, neck, and face. Today you'll put it all together in a full standing figure from imagination — no reference. This is the true test of internalized anatomy. You'll use construction: skeleton frame first, then masses, then surface forms.",
        task:
          "Draw a full standing figure (at least 8 inches tall) from imagination. Follow this order: 1) Bean figure skeleton, 2) Add torso masses (rib cage, pelvis), 3) Add limb cylinders, 4) Rough in hands and feet, 5) Add a simple head. Spend 20 minutes total.",
        aiFeedbackPrompt:
          "Assess anatomy construction pipeline (are all phases visible?), proportion accuracy (8 heads, correct limb lengths), form overlap and spatial clarity, and overall figure believability.",
      },
    ],
  },
  {
    name: "Drawing Smarter",
    emoji: "💡",
    days: "28–36",
    color: "orange",
    lessons: [
      {
        day: 28,
        title: "Light & Shadow Basics",
        lesson:
          "Light from a single source creates a predictable pattern on any form: the lit side, the shadow side (or 'core shadow'), reflected light on the darkest edge, and a cast shadow on the surface below. Understanding this formula transforms flat shapes into convincing 3D forms. The core shadow is the darkest part — it sits just past the edge where light can no longer reach. Reflected light is lighter than the core shadow but always darker than the lit side.",
        task:
          "Draw a sphere, a cube, and a cylinder on a flat surface. Place a light source in the upper-left. Shade each form using the light formula: lit side (light), transition (mid-tone), core shadow (darkest), reflected light (slightly lighter), cast shadow. Use hatching or smooth blending.",
        aiFeedbackPrompt:
          "Check light direction consistency across all three forms, core shadow placement and darkness, cast shadow direction, and whether reflected light is present but not overly bright.",
      },
      {
        day: 29,
        title: "Value Scales",
        lesson:
          "Value is the lightness or darkness of a tone, independent of color. Every drawing lives or dies by its values. The 5-step value scale — white, light gray, mid gray, dark gray, black — gives you a vocabulary for all the tones in a drawing. When in doubt, squint at your subject: squinting compresses values and shows you the big light and dark relationships. The goal isn't to copy every subtle tone, but to assign each area to a value step.",
        task:
          "First: draw and fill 5-step value scales (2 versions, one with pencil hatching, one blended). Second: pick 3 simple objects and draw them using only 5 values. Squint at each object before shading to identify which areas are which value step.",
        aiFeedbackPrompt:
          "Evaluate value gradation smoothness in the scales, separation between value steps, and accuracy of value assignment on the objects (are light areas light, dark areas dark?).",
      },
      {
        day: 30,
        title: "Cast Shadows",
        lesson:
          "Cast shadows are the shadows an object throws onto surrounding surfaces. They have three parts: the contact shadow (darkest, right where the object meets the surface), the core cast shadow (dark but slightly lighter), and a soft outer edge that diffuses into the ambient light. Cast shadows ground objects to surfaces and are essential for making a drawing feel anchored in space. Shadow shapes follow the contour of the surface they fall on — on a curved surface, the shadow curves.",
        task:
          "Draw 3 objects on a table surface. Focus entirely on getting the cast shadows right. Show the darkest contact point, the shadow shape projecting from the object, and the soft outer edge. Try one light source from the left.",
        aiFeedbackPrompt:
          "Assess contact shadow darkness and placement, shadow shape accuracy, outer edge softness, and whether the objects feel grounded on the surface.",
      },
      {
        day: 31,
        title: "Texture Through Mark-Making",
        lesson:
          "Texture in drawing isn't about copying every detail — it's about inventing marks that create the illusion of a surface. Rough wood: long parallel strokes with irregular breaks. Fabric: soft, flowing curved lines. Metal: clean, even hatching with sharp value changes. Fur: short, directional strokes that follow the form. Stone: irregular, multi-directional strokes of varying pressure. The density and direction of marks communicates the texture.",
        task:
          "Fill a page with 5 texture studies: wood grain, folded fabric, smooth metal, animal fur, and rough stone. For each, fill a 3×3 inch box with marks that suggest the texture. No outlines — just marks.",
        aiFeedbackPrompt:
          "Evaluate texture variety and distinctiveness, mark direction and whether it follows the surface logic, density variation to imply distance or shadow, and overall believability of each texture.",
      },
      {
        day: 32,
        title: "Hatching & Cross-Hatching",
        lesson:
          "Hatching (parallel lines) builds tone through density. Close lines = darker. Wider spacing = lighter. Cross-hatching adds a second layer of lines perpendicular to the first, building even darker tones. The critical rule: hatching lines should follow the direction of the form. Lines that wrap around a sphere make it feel round. Lines that go in the same direction on a flat surface make it feel flat. Never draw random hatching — make it mean something.",
        task:
          "Shade a sphere and a simplified face using only hatching lines — no blending, no smudging. For the sphere: lines curve around the form. For the face: lines follow the planes of the cheek, forehead, and nose. Build from light to dark with layered hatching.",
        aiFeedbackPrompt:
          "Assess whether hatching direction follows the form, consistency of line spacing for each value, cross-hatching layer logic, and overall tonal range achieved.",
      },
      {
        day: 33,
        title: "Silhouette Power",
        lesson:
          "A strong silhouette communicates everything. If you fill a drawing solid black, can you still tell what the pose is? Who the character is? Professional illustrators design silhouettes first — they're the visual skeleton of any figure or character. Weak silhouettes have ambiguous poses where limbs merge with the body. Strong silhouettes have clear separation between every element. This is especially important for character design and storytelling.",
        task:
          "Draw 3 human characters in action poses (running, jumping, pointing). Draw them in full detail first. Then fill the silhouette completely solid black. Check: can you read the pose clearly? If not, adjust the original drawing and repeat. The silhouette test doesn't lie.",
        aiFeedbackPrompt:
          "Evaluate silhouette clarity and pose readability at a glance, separation between body parts (are limbs distinguishable?), and whether the character feels dynamic vs. static in silhouette.",
      },
      {
        day: 34,
        title: "Focal Points",
        lesson:
          "Every drawing needs one clear focal point — the place your eye goes first. You create focal points with contrast (the highest contrast area gets the most attention), detail (more detail = more attention), and placement (center or rule-of-thirds positions attract the eye). Everything else in the drawing should lead the viewer toward the focal point, not compete with it. This is called visual hierarchy.",
        task:
          "Draw a simple scene with a clear focal point: a figure in a crowd, an object on a table, or a face in a landscape. Put the highest contrast and most detail at the focal point. Make everything else simpler and lower-contrast. Draw two thumbnails first to plan the composition.",
        aiFeedbackPrompt:
          "Assess focal point clarity (is there a clear single point of attention?), contrast distribution (highest contrast at focal point), detail distribution, and whether surrounding elements lead the eye inward.",
      },
      {
        day: 35,
        title: "Thumbnail Sketching",
        lesson:
          "Thumbnails are tiny compositional sketches — typically 1–2 inches — that let you solve problems fast before committing to a large drawing. Professional illustrators do 6–20 thumbnails before starting final work. In a thumbnail, you're only solving: where is the subject? Where is light vs. dark? Is there a clear focal point? Thumbnails should take 1–2 minutes each. Speed is the point — don't detail.",
        task:
          "Choose a scene (interior, landscape, or figure in environment). Do 6 thumbnail sketches of that scene, each no larger than 2×2 inches, each taking only 1–2 minutes. Vary the composition significantly between each. Then pick the best one and enlarge it to fill a full page.",
        aiFeedbackPrompt:
          "Evaluate compositional variety between thumbnails, value grouping clarity (light mass vs. dark mass), scale contrast, and whether the chosen composition is the strongest of the six.",
      },
      {
        day: 36,
        title: "Phase 4 Review",
        lesson:
          "You've covered light, shadow, value, texture, hatching, silhouettes, focal points, and thumbnails. Today you'll pull everything into one extended drawing from life or photo reference. This is your longest session yet — treat it as a complete artwork. Start with thumbnails, plan your focal point, build value from light to dark.",
        task:
          "Draw a still life (3–5 objects) with full rendering: light and shadow, value scale, cast shadows, and some texture. Spend 45 minutes. Do 2 thumbnails first. Light source from one consistent direction. Squint constantly to check values.",
        aiFeedbackPrompt:
          "Assess light source consistency, value range (are whites white and darks dark?), texture believability, focal point clarity, and overall compositional strength.",
      },
    ],
  },
  {
    name: "Hero Mode",
    emoji: "🏆",
    days: "37–45",
    color: "gold",
    lessons: [
      {
        day: 37,
        title: "Full Figure from Photo",
        lesson:
          "Today you apply the complete drawing pipeline to a full human figure from photo reference. The pipeline: construction (bean figure) → proportion check (8 heads) → anatomy (torso masses, limbs, extremities) → light and shadow → texture and detail. Take your time at each stage — don't jump to detail before structure is right. A well-constructed figure with simple shading beats a detailed figure with bad proportions.",
        task:
          "Find a full-body photo reference. Spend 45 minutes drawing the figure using the full pipeline. Stage 1 (5 min): bean figure and proportions. Stage 2 (10 min): anatomy masses. Stage 3 (15 min): refine forms and contour. Stage 4 (15 min): light and shadow.",
        aiFeedbackPrompt:
          "Evaluate full pipeline application (is construction visible underneath?), proportion consistency, anatomy believability, and light and shadow coherence.",
      },
      {
        day: 38,
        title: "Portrait from Photo",
        lesson:
          "Portrait drawing is the same pipeline applied to the head. Construction (Loomis egg), proportions (eye line, nose, mouth, ear), anatomy (skull, cheek planes, jaw), then value and light. The hardest part of portrait drawing is likeness — it lives in the proportional relationships between features more than in the details of any single feature. If the eyes are too far apart, no amount of detail will fix it.",
        task:
          "Find a portrait photo reference (front or three-quarter view). Spend 45 minutes. Stage 1: Loomis construction with proportion lines. Stage 2: place simplified features. Stage 3: refine contours and add the specific character of this face. Stage 4: value and light.",
        aiFeedbackPrompt:
          "Check likeness attempt (do proportions match the reference?), feature placement accuracy, skull volume and jaw shape, and value modeling of the face.",
      },
      {
        day: 39,
        title: "Hands from Photo",
        lesson:
          "Hands are difficult because they're complex and highly mobile — but with construction, they become manageable. Use the box-and-tube method: palm box first, then rough cylinders for each finger grouping, then refine into individual fingers. Pay attention to the angle the fingers make as they fan outward from the knuckles. The space between fingers is often as expressive as the fingers themselves.",
        task:
          "Draw your own hand in a challenging pose for 30 minutes. Try holding it in a position that shows the palm slightly, with some fingers curled. Use construction: palm box first, then finger tubes, then refine. Every 10 minutes, stop and check your proportions.",
        aiFeedbackPrompt:
          "Assess construction accuracy (is the palm box visible in the structure?), finger length and width ratios, knuckle placement, thumb joint believability, and overall hand pose readability.",
      },
      {
        day: 40,
        title: "Environment Sketch",
        lesson:
          "Drawing environments requires perspective and scale. Interior spaces have one or two vanishing points. Outdoor scenes often have a horizon line (eye level) with objects getting smaller toward it. Atmosphere (aerial perspective) makes distant things lighter and less detailed. The key composition principle: create depth layers — foreground, mid-ground, background — with different values and detail levels.",
        task:
          "Draw an interior room corner or an outdoor landscape (window view, park, street). Spend 45 minutes. Establish the horizon line and vanishing points first. Create three depth layers. Apply atmospheric perspective (distant objects lighter and softer).",
        aiFeedbackPrompt:
          "Evaluate perspective consistency (do lines converge correctly?), depth layers clarity, atmospheric perspective application, scale accuracy between objects, and overall spatial believability.",
      },
      {
        day: 41,
        title: "Creature Design",
        lesson:
          "Designing believable creatures means borrowing anatomy from real animals and recombining it. Start with a real animal as your base — then modify: change the proportions, add elements from other animals, push what makes it unique. The key to believability is internal consistency — the anatomy should suggest how the creature moves, what it eats, and where it lives.",
        task:
          "Design an original creature using real animal anatomy as your base. Start with a gesture/silhouette. Then construct the body with the anatomy tools you know. Add texture and value. Spend 45 minutes. Draw it from at least two angles.",
        aiFeedbackPrompt:
          "Assess anatomy adaptation believability (does it feel like it could exist?), construction quality, design clarity and uniqueness, texture rendering, and multi-angle consistency.",
      },
      {
        day: 42,
        title: "Character Design",
        lesson:
          "A great character design communicates personality instantly. The silhouette carries the most weight — viewers should be able to identify the character from a filled black shape alone. Shape language matters: circles suggest friendly/approachable, triangles suggest danger/dynamism, rectangles suggest stability/strength. A character's costume, pose, and expression complete the read.",
        task:
          "Design a character with a clear personality (your choice: hero, villain, comedic sidekick, wise elder, mysterious stranger). Start with 3 silhouette thumbnails. Pick the strongest. Add costume design, face/expression, and a signature pose. Spend 45 minutes.",
        aiFeedbackPrompt:
          "Evaluate silhouette strength and personality read, shape language consistency (circles/triangles/squares), costume and expression alignment with personality, and overall design clarity.",
      },
      {
        day: 43,
        title: "Style Exploration",
        lesson:
          "Every artist has a style — a recognizable visual voice. But style isn't chosen; it's discovered through copying and exploring. Today you'll copy the style of 3 different artists to feel what makes each one distinct: line quality, value approach, level of detail, how they simplify. You're not plagiarizing — you're learning by imitation, which is how every artist learns.",
        task:
          "Choose one subject (a face, a hand, or a simple scene). Draw it 3 times, each time copying the style of a different artist (search: manga style, impressionist sketch, minimalist illustration, comic book ink, etc.). Aim to genuinely capture what makes each style different. 20 minutes per study.",
        aiFeedbackPrompt:
          "Assess style variation distinctiveness between the three studies, linework and value approach differences, and whether the student has identified and applied what makes each style unique.",
      },
      {
        day: 44,
        title: "Final Project A",
        lesson:
          "This is your penultimate drawing — apply everything you've learned. Pick your strongest subject from the past 44 days: a figure, a face, a creature, a scene. Plan with thumbnails. Execute with construction and value. This should be your best work — not your most ambitious, but your most solid, confident drawing.",
        task:
          "Spend 1 hour on a drawing of your choice. Start with 3 thumbnails and choose the strongest composition. Use the full pipeline: construction → proportion → anatomy or perspective → value and light. No rushing detail before structure is right.",
        aiFeedbackPrompt:
          "Evaluate overall skill integration, construction quality, value range, composition strength, finish level, and confidence of line and mark-making.",
      },
      {
        day: 45,
        title: "Final Project B + Reflect",
        lesson:
          "Day 45. You made it. The last drawing of the Zero → Hero path. Make it count — and then compare it to Day 1. You are not the same artist who drew those first wobbly lines. The goal of drawing practice isn't perfection; it's growth, confidence, and the ability to see. Keep going. One drawing a day is all it takes.",
        task:
          "Spend 1 hour on your final drawing. Make it something that matters to you — a portrait of someone you love, a scene from your imagination, or the thing you always wanted to draw. When you're done, find your Day 1 drawing and put them side by side. Look at how far you've come.",
        aiFeedbackPrompt:
          "Assess growth evidence compared to expected Day 1 level, confidence in fundamental skills (line, form, value), and overall expressive quality of the final drawing.",
      },
    ],
  },
];

export function getLesson(day: number): Lesson | undefined {
  for (const phase of curriculum) {
    const found = phase.lessons.find((l) => l.day === day);
    if (found) return found;
  }
  return undefined;
}

export function getPhaseForDay(day: number): Phase | undefined {
  return curriculum.find((phase) => {
    const [start, end] = phase.days.split("–").map(Number);
    return day >= start && day <= end;
  });
}

export const MOTIVATIONAL_MESSAGES = [
  "Great work!",
  "You're getting better!",
  "That line work!",
  "Keep going!",
  "Artist in the making!",
  "Beautiful progress!",
  "Your eye is sharpening!",
  "Look at you go!",
  "Unstoppable!",
  "Every mark counts!",
];

export function getStreakMessage(days: number): string {
  if (days <= 2) return "Good start!";
  if (days <= 6) return "Building momentum!";
  if (days <= 13) return "On fire!";
  return "Unstoppable!";
}
