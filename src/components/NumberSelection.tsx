
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface NumberSelectionProps {
  onNumbersSelected: (numbers: number[]) => void;
}

const NumberSelection = ({ onNumbersSelected }: NumberSelectionProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    // Parse the input string into an array of numbers
    const numbersArray = inputValue
      .split(",")
      .map(num => num.trim())
      .filter(num => num !== "")
      .map(num => parseInt(num));

    // Validate that all entries are valid numbers
    if (numbersArray.some(isNaN)) {
      setError("Please enter valid numbers separated by commas");
      return;
    }

    // Check if we have at least one number
    if (numbersArray.length === 0) {
      setError("Please enter at least one number");
      return;
    }

    // Clear any previous errors
    setError("");
    
    // Pass the selected numbers to the parent component
    onNumbersSelected(numbersArray);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Step 1: Select Numbers</CardTitle>
        <CardDescription>
          Enter a list of integers separated by commas (e.g., 1,34,35,36,47)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Enter numbers (e.g., 1,34,35,36,47)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  );
};

export default NumberSelection;
