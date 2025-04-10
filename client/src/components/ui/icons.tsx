import { 
  Award, 
  Check, 
  CheckCircle, 
  ChevronRight, 
  CircuitBoard, 
  ContactlessRound,
  Crown, 
  EmojiEvents,
  Loader2, 
  MessageSquare, 
  MilitaryTech,
  Router, 
  Shield, 
  SignalCellularAlt,
  Tool, 
  Wifi,
  X 
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconKeys = keyof typeof Icons;

export const Icons = {
  logo: CircuitBoard,
  spinner: Loader2,
  check: Check,
  messageSquare: MessageSquare,
  shield: Shield,
  wifi: Wifi,
  router: Router,
  circuit: CircuitBoard,
  tool: Tool,
  award: Award,
  chevronRight: ChevronRight,
  x: X,
  checkCircle: CheckCircle,
  crown: Crown,

  // Achievement Icons
  signal_cellular_alt: SignalCellularAlt,
  contactless: ContactlessRound,
  military_tech: MilitaryTech,
  emoji_events: EmojiEvents,
} as const;