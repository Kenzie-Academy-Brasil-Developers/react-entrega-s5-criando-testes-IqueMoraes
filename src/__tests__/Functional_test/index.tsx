import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import api from "../../services";
import Search from "../../components/Search";
import Address from "../../components/Cep";
import App from "../../App";
import MockAdapter from "axios-mock-adapter";
import { LocateCepProvider } from "../../providers/CepProvider";

const apiMock = new MockAdapter(api);

describe("Functional search component", () => {
  it("should be able to retrieve address by CEP number", async () => {
    apiMock.onGet("20031050").replyOnce(200, {
      bairro: "Centro",
      cidade: "Rio de Janeiro",
      logradouro: "Praça Floriano",
      estado_info: {
        area_km2: "43.781,566",
        codigo_ibge: "33",
        nome: "Rio de Janeiro",
      },
      cep: "20031050",
      cidade_info: {
        area_km2: "1200,179",
        codigo_ibge: "3304557",
      },
      estado: "RJ",
    });

    render(
      <LocateCepProvider>
        <App />
      </LocateCepProvider>
    );

    const searchInput = screen.getByPlaceholderText("Insira o CEP");
    const actionButtton = screen.getByText("Buscar pelo CEP");

    fireEvent.change(searchInput, {
      target: {
        value: "20031050",
      },
    });

    fireEvent.click(actionButtton);


    // const AddressTextArea = screen.getByTestId("logradouto-test");

    await waitFor(() => {
      expect(screen.getByDisplayValue("Praça Floriano")).toBeInTheDocument();
    });
  });
});
