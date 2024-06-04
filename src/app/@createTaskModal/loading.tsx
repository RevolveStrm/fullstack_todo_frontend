import { Modal } from "@/components/modal";
import { Spinner } from "@/components/spinner";

const Loading = () => {
  return (
    <Modal>
        <Spinner size={64}/>
        <p className="animate-bounce text-xl text-white py-[20px]">Loading...</p>
    </Modal>
  );
};

export default Loading;
