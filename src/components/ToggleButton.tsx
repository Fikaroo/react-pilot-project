import React, { useState } from "react";
import { Button } from "./ui/button";

const ToggleButton = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Button
        onClick={handleOpen}
        className="w-full"
        variant={!isOpen ? "default" : "outline"}
      >
        {title}
      </Button>

      {isOpen ? children : null}
    </div>
  );
};

export default ToggleButton;
