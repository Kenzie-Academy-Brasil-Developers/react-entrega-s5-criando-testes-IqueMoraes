import { render, screen } from "@testing-library/react";
import Search from "../../components/Search";

describe("Button and Input components", () => {
    test("Should be rendering a button", () => {
        render(<Search/>)

        const actionButtton = screen.getByText("Buscar pelo CEP");

        expect(actionButtton).toBeInTheDocument()
    })

    test("Should be rendering a input", () => {
        render(<Search/>)

        const searchInput = screen.getByPlaceholderText("Insira o CEP");

        expect(searchInput).toBeInTheDocument()
    })
})