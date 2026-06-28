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
          className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
            selectedCategory === category.id
              ? 'bg-apple-black text-white'
              : 'bg-apple-light text-apple-gray hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
