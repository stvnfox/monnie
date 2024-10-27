import type { FunctionComponent } from "react";
import {
  User,
  Building2,
  Target,
  TrendingUp,
  MinusCircle,
  Book,
  Coins,
  Globe,
  House,
} from "lucide-react";
import type { PortfolioType } from "~/types/portfolios";

type IconProps = {
  className?: string;
};

export const getPortfolioTypeIcon = (
  type: PortfolioType
): FunctionComponent<IconProps> => {
  switch (type) {
    case "personal":
      return User;
    case "household":
      return House;
    case "savings":
      return Coins;
    case "business":
      return Building2;
    case "project":
      return Target;
    case "investment":
      return TrendingUp;
    case "debt":
      return MinusCircle;
    case "education":
      return Book;
    case "travel":
      return Globe;
    default:
      return User;
  }
};
