export enum PromptMode {
  Text = 'Text',
  Image = 'Image',
  Video = 'Video',
  Audio = 'Audio',
  Code = 'Code',
}

export enum AspectRatio {
  Square = '1:1',
  Landscape = '16:9',
  Portrait = '9:16',
  Wide = '4:3',
  Tall = '3:4',
  Photo = '4:5',
}

export enum ContentTone {
  Neutral = 'Neutral',
  Humorous = 'Humorous',
  Dramatic = 'Dramatic',
  Whimsical = 'Whimsical',
  Serious = 'Serious',
  Suspenseful = 'Suspenseful',
  Adventurous = 'Adventurous',
  Tension = 'Tension',
  Offbeat = 'Offbeat',
  Surreal = 'Surreal',
}

export enum PointOfView {
  ThirdPerson = 'Third-Person',
  FirstPerson = 'First-Person (POV)',
  Aerial = 'Aerial',
  Dolly = 'Dolly',
  StaticShot = 'Static Shot',
  TrackingShot = 'Tracking Shot',
  DutchAngle = 'Dutch Angle',
}

export enum ImageStyle {
  Hyperrealistic = 'Hyperrealistic',
  Cinematic = 'Cinematic',
  DigitalArt = 'Digital Art',
  _35mmFilm = '35mm Film Photo',
  OilPainting = 'Oil Painting',
  Watercolor = 'Watercolor',
  Cyberpunk = 'Cyberpunk',
  Minimalist = 'Minimalist',
}

export enum Lighting {
  HarshDirectFlash = 'Harsh Direct Flash',
  GoldenHour = 'Golden Hour',
  SoftStudio = 'Soft Studio Light',
  NeonGlow = 'Neon Glow',
  DramaticBacklight = 'Dramatic Backlighting',
  NaturalLight = 'Natural Light',
}

export enum Framing {
  TightShot = 'Tight Shot',
  MediumShot = 'Medium Shot',
  FullBodyShot = 'Full Body Shot',
  EstablishingShot = 'Establishing Shot',
  Cinematic = 'Cinematic',
  Cropped = 'Cropped',
  Centered = 'Centered',
}

export enum CameraAngle {
  Frontal = 'Frontal',
  LowAngle = 'Slightly Low Angle',
  TopDown = 'Top-Down',
  Diagonal = 'Diagonal Angle',
  BirdsEyeView = "Bird's Eye View",
  DutchAngle = 'Dutch Angle',
}

export enum CameraResolution {
  Standard = 'Standard',
  HD = 'HD',
  FourK = '4K',
  EightK = '8K',
  Hyperdetailed = 'Hyper-detailed',
}

export enum AudioType {
    Music = 'Music',
    Speech = 'Speech',
    SoundEffect = 'Sound Effect',
}

export enum AudioVibe {
    Upbeat = 'Upbeat',
    Melancholy = 'Melancholy',
    Atmospheric = 'Atmospheric',
    Suspenseful = 'Suspenseful',
    Epic = 'Epic',
    Minimalist = 'Minimalist',
}

export enum CodeLanguage {
    JavaScript = 'JavaScript',
    Python = 'Python',
    HTML = 'HTML',
    CSS = 'CSS',
    SQL = 'SQL',
    TypeScript = 'TypeScript',
    Java = 'Java',
    Shell = 'Shell Script',
}

export enum CodeTask {
    Generate = 'Generate Code',
    Debug = 'Debug Code',
    Refactor = 'Refactor Code',
    Explain = 'Explain Code',
    Document = 'Document Code (Docstrings)',
}
