import useConfirm from "@util/hooks/useConfirm";
import ConfirmPopup from "@component/PopUp/Popup";
import "@style/main.scss";

const HomeButton = () => {
  const { isOpen, openConfirm, closeConfirm, handleConfirm } = useConfirm();
  return (
    <>
      <ConfirmPopup
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={closeConfirm}
      />
      <button
        id="home-btn"
        onClick={() => openConfirm(() => (window.location.href = "/open-source-games/"))}
      >
        <img
          src="https://www.svgrepo.com/show/483341/home.svg"
          alt="Home"
          width={28}
          id="home-icon"
        />
      </button>
    </>
  );
};

export default HomeButton;
