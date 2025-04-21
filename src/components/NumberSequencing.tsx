
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface NumberSequencingProps {
  selectedNumbers: number[];
  onSequenceCompleted: (sequence: number[]) => void;
  onBack: () => void;
}

const NumberSequencing = ({ selectedNumbers, onSequenceCompleted, onBack }: NumberSequencingProps) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const remainingNumbers = selectedNumbers.filter(num => !sequence.includes(num));

  const handleNumberClick = (number: number) => {
    setSequence([...sequence, number]);
  };

  const handleBackClick = () => {
    if (sequence.length > 0) {
      setSequence(sequence.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    if (sequence.length === selectedNumbers.length) {
      onSequenceCompleted([...sequence]);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Step 2: Create Your Sequence</CardTitle>
            <CardDescription>
              Click the numbers in your preferred order
            </CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Available numbers:</h3>
          <div className="flex flex-wrap gap-2">
            {remainingNumbers.map((num) => (
              <Button
                key={num}
                variant="outline"
                onClick={() => handleNumberClick(num)}
                className="h-10 w-14"
              >
                {num}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Your sequence:</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackClick}
              disabled={sequence.length === 0}
              className="h-8 px-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Undo
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 min-h-14 p-2 border rounded-md">
            {sequence.map((num, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center h-10 w-14 bg-primary text-primary-foreground rounded-md"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={sequence.length !== selectedNumbers.length}
        >
          Complete Sequence
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NumberSequencing;
