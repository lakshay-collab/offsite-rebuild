import React, { createContext, useCallback, useContext, useState } from "react";
import ProposalModal from "@/components/ProposalModal";

// One proposal form for the whole site: any "Get in touch" / proposal button calls openProposal().
const ProposalCtx = createContext({ openProposal: () => {} });

export const ProposalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState({});

  // optional prefill, e.g. openProposal({ email }) from an inline email field
  const openProposal = useCallback((values) => {
    setPrefill(values && typeof values === "object" && !values.nativeEvent ? values : {});
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <ProposalCtx.Provider value={{ openProposal }}>
      {children}
      <ProposalModal open={open} onClose={close} prefill={prefill} />
    </ProposalCtx.Provider>
  );
};

export const useProposal = () => useContext(ProposalCtx);
