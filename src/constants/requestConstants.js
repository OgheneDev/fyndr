export const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Van', 'Truck'];
export const propertyTypes = ['Apartment', 'Detached', 'Semi-Detached', 'Terrace', 'Bungalow', 'Duplex', 'Mansion'];
export const cleaningTypes = ['regular', 'post-construction'];
export const carMakes = ['Toyota', 'Honda', 'Ford', 'Nissan', 'Hyundai', 'Kia', 'Mercedes', 'BMW', 'Lexus'];
export const carModels = {
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander'],
  Honda: ['Civic', 'Accord', 'CR-V'],
  Ford: ['Focus', 'Fusion', 'Escape'],
  Nissan: ['Altima', 'Sentra', 'Rogue'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson'],
  Kia: ['Rio', 'Sportage', 'Sorento'],
  Mercedes: ['C-Class', 'E-Class', 'GLA'],
  BMW: ['3 Series', '5 Series', 'X3'],
  Lexus: ['RX', 'ES', 'GX'],
};
export const carYears = Array.from({ length: 56 }, (_, i) => `${1970 + i}`);
export const tabs = [
  { label: 'Properties', category: 'real-estate' },
  { label: 'Car Hire', category: 'car-hire' },
  { label: 'Cleaning', category: 'cleaning' },
  { label: 'Car Parts', category: 'car-parts' },
  { label: 'Automobiles', category: 'automobile' },
  { label: 'Beauty', category: 'beauty' },
  { label: 'Catering', category: 'catering' },
  { label: 'Carpentry', category: 'carpenter' },
  { label: 'Electrician', category: 'electrician' },
  { label: 'IT', category: 'it' },
  { label: 'Mechanic', category: 'mechanic' },
  { label: 'Media', category: 'media' },
  { label: 'Plumbing', category: 'plumbing' },
  { label: 'Hospitality', category: 'hospitality' },
  { label: 'Event Management', category: 'event-management' },
  { label: 'Employment', category: 'employment' },
];
export const initialTab = 'Properties';