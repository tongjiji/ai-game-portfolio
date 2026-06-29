interface CategoryFilterProps {
  categories: { id: string; name: string }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${selectedCategory === category.id
            ? 'bg-gradient-to-r from-tech-blue to-tech-purple text-white border-glow-blue'
            : 'glass-card text-white/70 hover:text-white hover:glass-card-hover'
            }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
