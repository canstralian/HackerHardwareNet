import { 
  Award, 
  Check, 
  CheckCircle, 
  ChevronRight, 
  CircuitBoard, 
  Smartphone,
  Crown, 
  Medal,
  Loader2, 
  MessageSquare, 
  Trophy,
  Router, 
  Shield, 
  Signal,
  Wrench, 
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
  tool: Wrench,
  award: Award,
  chevronRight: ChevronRight,
  x: X,
  checkCircle: CheckCircle,
  crown: Crown,

  // Achievement Icons
  signal_cellular_alt: Signal,
  contactless: Smartphone,
  military_tech: Medal,
  emoji_events: Trophy,
} as const;