import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckoutOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckoutOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
