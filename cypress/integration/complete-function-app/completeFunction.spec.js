context("search address", () => {
  it("into landing page text the cep number", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);
  })

  it("Type the cep number into number input", () => {
    cy.get("input[id=NumberInput]").type(20031050)
    cy.contains("Buscar pelo CEP").click()
  }) 

  it("Should match mock api value with the search's result", () => {

    cy.intercept("GET", "/20031050", {
      statusCode: 200,
      body: {
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
      },
    });

    cy.get("input[id=InputLogradouro").should('have.value', 'Praça Floriano')

  })


  });
