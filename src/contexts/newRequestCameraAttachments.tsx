import React, { createContext, useContext, useState } from 'react';

interface NewRequestCameraContextData {
  attachments: string[];
  setAttachments: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewRequestCameraContext = createContext<NewRequestCameraContextData>(
  {} as NewRequestCameraContextData,
);

const NewRequestCameraProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [attachments, setAttachments] = useState([] as string[]);

  return (
    <NewRequestCameraContext.Provider
      value={{
        attachments,
        setAttachments,
      }}
    >
      {children}
    </NewRequestCameraContext.Provider>
  );
};

function useNewRequestCameraAttachments() {
  const context = useContext(NewRequestCameraContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { NewRequestCameraProvider, useNewRequestCameraAttachments };
