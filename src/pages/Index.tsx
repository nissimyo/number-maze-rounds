
import React, { useState } from "react";
import NumberSelection from "@/components/NumberSelection";
import NumberSequencing from "@/components/NumberSequencing";
import RoundsTable from "@/components/RoundsTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Define the application steps
enum Step {
  SELECT_NUMBERS,
  CREATE_SEQUENCE,
  CONTINUE_OR_FINISH,
  SHOW_RESULTS,
}

const Index = () => {
  // State for the current step
  const [currentStep, setCurrentStep] = useState<Step>(Step.SELECT_NUMBERS);
  
  // State for the selected numbers in the current round
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  
  // State for all completed rounds
  const [completedRounds, setCompletedRounds] = useState<number[][]>([]);

  // Handler for when numbers are selected
  const handleNumbersSelected = (numbers: number[]) => {
    setSelectedNumbers(numbers);
    setCurrentStep(Step.CREATE_SEQUENCE);
  };

  // State for the current sequence
  const [currentSequence, setCurrentSequence] = useState<number[]>([]);

  // Handler for when a sequence is completed
  const handleSequenceCompleted = (sequence: number[]) => {
    setCurrentSequence(sequence);
    setCurrentStep(Step.CONTINUE_OR_FINISH);
  };

  // Handler for continuing to a new round
  const handleContinue = () => {
    // Add the current sequence to completed rounds
    setCompletedRounds([...completedRounds, currentSequence]);
    // Reset and go back to step 1
    setSelectedNumbers([]);
    setCurrentSequence([]);
    setCurrentStep(Step.SELECT_NUMBERS);
  };

  // Handler for finishing the game
  const handleFinish = () => {
    // Add the final sequence to completed rounds
    setCompletedRounds([...completedRounds, currentSequence]);
    setCurrentStep(Step.SHOW_RESULTS);
  };

  // Handler for going back to number selection
  const handleBackToSelection = () => {
    setCurrentStep(Step.SELECT_NUMBERS);
  };

  // Handler for starting a new game
  const handleStartNewGame = () => {
    setCompletedRounds([]);
    setSelectedNumbers([]);
    setCurrentStep(Step.SELECT_NUMBERS);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Number Sequence Game</h1>

        {currentStep === Step.SELECT_NUMBERS && (
          <NumberSelection onNumbersSelected={handleNumbersSelected} />
        )}

        {currentStep === Step.CREATE_SEQUENCE && (
          <NumberSequencing 
            selectedNumbers={selectedNumbers} 
            onSequenceCompleted={handleSequenceCompleted}
            onBack={handleBackToSelection}
          />
        )}

        {currentStep === Step.CONTINUE_OR_FINISH && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Round Complete!</CardTitle>
              <CardDescription>
                Would you like to continue with another round or finish the game?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your sequence for this round:
              </p>
              <div className="flex flex-wrap gap-2">
                {currentSequence.map((num, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-center h-10 w-14 bg-primary text-primary-foreground rounded-md"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button onClick={handleContinue} className="flex-1">
                Continue
              </Button>
              <Button onClick={handleFinish} variant="outline" className="flex-1">
                Finish
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === Step.SHOW_RESULTS && (
          <div className="space-y-6">
            <RoundsTable rounds={completedRounds} />
            <div className="flex justify-center">
              <Button onClick={handleStartNewGame}>
                Start New Game
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
