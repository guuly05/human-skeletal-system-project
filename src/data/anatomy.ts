export type SystemId =
  | 'skeletal'
  | 'muscular'
  | 'nervous'
  | 'cardiovascular'
  | 'respiratory';

export type AnatomyPart = {
  id: string;
  name: string;
  system: SystemId;
  summary: string;
  function: string;
  accent: string;
  region: string;
};

export type SystemDefinition = {
  id: SystemId;
  name: string;
  shortName: string;
  color: string;
  description: string;
};

export const systems: SystemDefinition[] = [
  { id: 'skeletal', name: 'Skeletal system', shortName: 'Bones', color: '#d7e2f3', description: 'The living framework that supports, protects, and moves the body.' },
  { id: 'muscular', name: 'Muscular system', shortName: 'Muscles', color: '#e86b70', description: 'Contractile tissues that create movement, stability, and heat.' },
  { id: 'nervous', name: 'Nervous system', shortName: 'Nerves', color: '#f4c95d', description: 'The body-wide communication network for sensation, control, and response.' },
  { id: 'cardiovascular', name: 'Cardiovascular system', shortName: 'Vessels', color: '#df4f76', description: 'The heart and vessels that move blood, oxygen, nutrients, and heat.' },
  { id: 'respiratory', name: 'Respiratory system', shortName: 'Breathing', color: '#6fc7e8', description: 'The airways and lungs that exchange oxygen and carbon dioxide.' },
];

export const anatomyParts: AnatomyPart[] = [
  { id: 'heart', name: 'Heart', system: 'cardiovascular', summary: 'A muscular pump with four chambers and four major valves.', function: 'Maintains circulation by producing rhythmic pressure that drives blood through the pulmonary and systemic circuits.', accent: '#ff557d', region: 'Thorax' },
  { id: 'lungs', name: 'Lungs', system: 'respiratory', summary: 'Paired organs where oxygen enters the blood and carbon dioxide leaves it.', function: 'Exchange gases across millions of microscopic alveoli while the diaphragm changes thoracic pressure.', accent: '#63c8e8', region: 'Thorax' },
  { id: 'spinal-cord', name: 'Spinal cord', system: 'nervous', summary: 'A protected communication highway between the brain and the body.', function: 'Carries sensory and motor signals and coordinates fast protective reflexes.', accent: '#f4c95d', region: 'Back' },
  { id: 'femur', name: 'Femur', system: 'skeletal', summary: 'The longest and strongest bone in the human body.', function: 'Transfers forces between the hip and knee while providing leverage for the thigh muscles.', accent: '#d7e2f3', region: 'Lower limb' },
  { id: 'pectoralis', name: 'Pectoralis major', system: 'muscular', summary: 'A broad chest muscle that acts across the shoulder joint.', function: 'Adducts and rotates the arm and helps connect upper-limb movement to the trunk.', accent: '#e86b70', region: 'Thorax' },
];
