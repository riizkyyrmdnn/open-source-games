import PropTypes from 'prop-types';
import "@style/main.scss";
import Overlay from "@component/Overlay/Overlay";

const ConfirmPopup = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="confirm-popup">
        <h1 className="title">Are You sure?</h1>
        <button className="button-yes" onClick={onConfirm}>Yes</button>
        <button className="button-no" onClick={onCancel}>No</button>
      </div>
      <Overlay />
    </>
  );
};
ConfirmPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ConfirmPopup;
