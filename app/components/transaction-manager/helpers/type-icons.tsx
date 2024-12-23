import {
  Wallet,
  Building2,
  Gift,
  Award,
  Coins,
  Home,
  ShoppingCart,
  Utensils,
  Car,
  Bus,
  Wine,
  Smartphone,
  Shirt,
  HeartPulse,
  Wrench,
  Pencil,
  DollarSign,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Landmark,
  BadgeDollarSign,
  Lightbulb,
  Wifi,
  Droplets,
  Phone,
  Gamepad,
} from "lucide-react";
import type { FunctionComponent } from "react";
import type {
  TransactionCategory,
  TransactionCategoryValue,
} from "~/types/transactions";

export const getTransactionTypeIcon = (type: TransactionCategory) => {
  const iconMap = {
    // Income
    "Salary & Wages": <Wallet size={16} />,
    "Business Income": <Building2 size={16} />,
    "Gifts Received": <Gift size={16} />,
    "Bonuses & Awards": <Award size={16} />,
    "Interest & Dividends": <Coins size={16} />,

    // Regular Expenses
    "Housing & Rent": <Home size={16} />,
    "Groceries & Supplies": <ShoppingCart size={16} />,
    "Dining & Restaurants": <Utensils size={16} />,
    Transportation: <Car size={16} />,
    "Public Transit": <Bus size={16} />,

    // Discretionary Spending
    Entertainment: <Wine size={16} />,
    "Electronics & Gadgets": <Smartphone size={16} />,
    "Gaming & Hobbies": <Gamepad size={16} />,
    "Shopping & Clothing": <Shirt size={16} />,
    Healthcare: <HeartPulse size={16} />,

    // Maintenance & Services
    "Maintenance & Repairs": <Wrench size={16} />,
    "Education & Training": <Pencil size={16} />,
    "Fees & Charges": <DollarSign size={16} />,
    "Credit Card Payments": <CreditCard size={16} />,

    // Savings & Investments
    Savings: <PiggyBank size={16} />,
    Investments: <TrendingUp size={16} />,
    Banking: <Landmark size={16} />,
    Retirement: <BadgeDollarSign size={16} />,

    // Utilities
    Electricity: <Lightbulb size={16} />,
    "Internet & Cable": <Wifi size={16} />,
    "Water & Sewage": <Droplets size={16} />,
    "Phone & Mobile": <Phone size={16} />,
  };

  return iconMap[type];
};

interface TransactionCategoryIconProps {
  category: TransactionCategoryValue;
  className?: string;
}

export const TransactionCategoryIcon: FunctionComponent<
  TransactionCategoryIconProps
> = ({ category, className }) => {
  const iconMap = {
    // Income
    salary: <Wallet size={16} className={className} />,
    business: <Building2 size={16} className={className} />,
    gifts: <Gift size={16} className={className} />,
    bonus: <Award size={16} className={className} />,
    interest: <Coins size={16} className={className} />,

    // Regular Expenses
    housing: <Home size={16} className={className} />,
    groceries: <ShoppingCart size={16} className={className} />,
    dining: <Utensils size={16} className={className} />,
    transport: <Car size={16} className={className} />,
    transit: <Bus size={16} className={className} />,

    // Discretionary Spending
    entertainment: <Wine size={16} className={className} />,
    electronics: <Smartphone size={16} className={className} />,
    gaming: <Gamepad size={16} className={className} />,
    shopping: <Shirt size={16} className={className} />,
    healthcare: <HeartPulse size={16} className={className} />,

    // Maintenance & Services
    maintenance: <Wrench size={16} className={className} />,
    education: <Pencil size={16} className={className} />,
    fees: <DollarSign size={16} className={className} />,
    credit: <CreditCard size={16} className={className} />,

    // Savings & Investments
    savings: <PiggyBank size={16} className={className} />,
    investments: <TrendingUp size={16} className={className} />,
    banking: <Landmark size={16} className={className} />,
    retirement: <BadgeDollarSign size={16} className={className} />,

    // Utilities
    electricity: <Lightbulb size={16} className={className} />,
    internet: <Wifi size={16} className={className} />,
    water: <Droplets size={16} className={className} />,
    phone: <Phone size={16} className={className} />,
  };

  return iconMap[category];
};
