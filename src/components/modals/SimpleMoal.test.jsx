import { render, screen } from "@testing-library/react"
import SimpleModal from "./SimpleModal"

const renderComponent = props => render(<SimpleModal {...props} />);

describe("SimpleModal: ", () => {
    test("Renders SimpleModal", () => {
        renderComponent({
            modalOpen: true,
            modalTitle: "Testing"
        });
        expect(screen.getByText("Testing")).toBeVisible();
    });
});