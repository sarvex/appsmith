const dsl = require("../../../../fixtures/inputWidgetMobileDsl.json");
import { ObjectsRegistry } from "../../../../support/Objects/Registry";
const agHelper = ObjectsRegistry.AggregateHelper;
let theight;
let twidth;

describe("Validating Mobile Views", function () {
  afterEach(() => {
    agHelper.SaveLocalStorageCache();
  });

  beforeEach(() => {
    agHelper.RestoreLocalStorageCache();
  });
  it("Validate change with height width for widgets", function () {
    cy.addDsl(dsl);
    cy.wait(5000); //for dsl to settle
    //cy.openPropertyPane("containerwidget");
    cy.PublishtheApp();
    cy.wait(2000);
    cy.get(".t--widget-inputwidgetv2")
      .invoke("css", "height")
      .then((newheight) => {
        theight = newheight;
      });
    cy.get(".t--widget-inputwidgetv2")
      .invoke("css", "width")
      .then((newwidth) => {
        twidth = newwidth;
      });
  });

  let phones = [
    "iphone-3",
    "iphone-4",
    "iphone-5",
    "iphone-6",
    "iphone-6+",
    "iphone-7",
    "iphone-8",
    "iphone-x",
    "samsung-note9",
    "samsung-s10",
  ];
  phones.forEach((phone) => {
    it(`${phone} port execution`, function () {
      if (Cypress._.isArray(phone)) {
        cy.viewport(phone[0], phone[1]);
      } else {
        cy.viewport(phone);
      }
      cy.wait(2000);
      cy.get(".t--widget-inputwidgetv2")
        .invoke("css", "height")
        .then((newheight) => {
          expect(theight).to.not.equal(newheight);
        });
      cy.get(".t--widget-inputwidgetv2")
        .invoke("css", "width")
        .then((newwidth) => {
          expect(twidth).to.not.equal(newwidth);
        });
    });
  });
});
