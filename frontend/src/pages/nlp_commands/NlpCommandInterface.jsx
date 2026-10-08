import {NlpHeader} from './components/NlpHeader';
import { NlpInterface } from "./components/Interface";
import { ConstraintCheck } from "./components/ConstraintCheck";
export const NlpCommandInterface = () => {
  return <div className="p-[10px] md:p-[32px] ">
    <NlpHeader/>
    <div className="flex flex-col md:flex-row gap-3 w-full">
      <NlpInterface/>
      <ConstraintCheck/>
    </div>
  </div>;
};
