import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Colombo", "Kandy", "Kaluthara", "Galle", "Mattala"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (selectedValue) {
      dispatch(setSearchedQuery(selectedValue));
    }
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-5 rounded-md shadow-sm border border-gray-200">
      <h2 className="font-bold text-xl mb-4 text-gray-800">Filter Jobs</h2>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((filter, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">{filter.filterType}</h3>
              {
                filter.array.map((item, idx) => {
                  const itemId = `filter-${index}-${idx}`;
                  return (
                    <div key={itemId} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId} className="text-sm text-gray-600">
                        {item}
                      </Label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
