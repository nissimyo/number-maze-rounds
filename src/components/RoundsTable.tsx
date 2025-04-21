
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RoundsTableProps {
  rounds: number[][];
}

const RoundsTable = ({ rounds }: RoundsTableProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Your Completed Rounds</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Round</TableHead>
              <TableHead>Sequence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rounds.map((round, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {round.map((num, numIndex) => (
                      <div 
                        key={numIndex} 
                        className="flex items-center justify-center h-8 w-12 bg-secondary text-secondary-foreground rounded-md text-sm"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RoundsTable;
