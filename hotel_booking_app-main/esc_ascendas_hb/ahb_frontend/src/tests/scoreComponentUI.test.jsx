import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Score from "../components/HotelInfo/Score";

describe("The Ratings Score Component", () => {
  const trustyou = {
    overall: 31,
    kaligo_overall: 52,
    business: 50,
    family: 20,
    leisure: 40,
  };

  const amenities = [
    { name: "wiFi", score: 26 },
    { name: "breakfast", score: 29 },
    { name: "room", score: 32 },
    { name: "comfort", score: 38 },
    { name: "food", score: 76 },
  ];

  it("should render the component correctly with valid data", () => {
    const component = render(
      <Score score={trustyou} amenities_ratings={amenities} />
    );

    expect(component.getByTestId("amenities0").textContent).toBe("WiFi");
    expect(component.getByTestId("amenities1").textContent).toBe("Breakfast");
    expect(component.getByTestId("amenities2").textContent).toBe("Room");
    expect(component.getByTestId("amenities3").textContent).toBe("Comfort");
    expect(component.getByTestId("amenities4").textContent).toBe("Food");
    expect(component.queryByTestId("amenities5")).toBe(null);
    expect(component.getByTestId("amenities-score0").textContent).toBe(
      String(amenities[0].score)
    );
    expect(component.getByTestId("amenities-score1").textContent).toBe(
      String(amenities[1].score)
    );
    expect(component.getByTestId("amenities-score2").textContent).toBe(
      String(amenities[2].score)
    );
    expect(component.getByTestId("amenities-score3").textContent).toBe(
      String(amenities[3].score)
    );
    expect(component.getByTestId("amenities-score4").textContent).toBe(
      String(amenities[4].score)
    );
    expect(component.getByTestId("rating0").textContent).toBe("Overall");
    expect(component.queryByTestId("rating1")).toBe(null);
    expect(component.getByTestId("rating2").textContent).toBe("Business");
    expect(component.getByTestId("rating3").textContent).toBe("Family");
    expect(component.getByTestId("rating4").textContent).toBe("Leisure");
    expect(component.getByTestId("rating-score0").textContent).toBe(
      String(trustyou["overall"])
    );
    expect(component.queryByTestId("rating-score1")).toBe(null);
    expect(component.getByTestId("rating-score2").textContent).toBe(
      String(trustyou["business"])
    );
    expect(component.getByTestId("rating-score3").textContent).toBe(
      String(trustyou["family"])
    );
    expect(component.getByTestId("rating-score4").textContent).toBe(
      String(trustyou["leisure"])
    );
  });

  it("should ignore trustyou entries without scores", () => {
    const trustyou2 = { ...trustyou, business: null };
    const component = render(
      <Score score={trustyou2} amenities_ratings={amenities} />
    );
    expect(component.getByTestId("rating0").textContent).toBe("Overall");
    expect(component.queryByTestId("rating1")).toBe(null);
    expect(component.queryByTestId("rating2")).toBe(null);
    expect(component.getByTestId("rating3").textContent).toBe("Family");
    expect(component.getByTestId("rating4").textContent).toBe("Leisure");
    expect(component.getByTestId("rating-score0").textContent).toBe(
      String(trustyou["overall"])
    );
    expect(component.queryByTestId("rating-score1")).toBe(null);
    expect(component.queryByTestId("rating-score2")).toBe(null);
    expect(component.getByTestId("rating-score3").textContent).toBe(
      String(trustyou["family"])
    );
    expect(component.getByTestId("rating-score4").textContent).toBe(
      String(trustyou["leisure"])
    );
  });

  it("should ignore amenities entries without scores or names", () => {
    const amenities2 = [
      ...amenities,
      { name: "this" },
      { score: 45 },
      { name: null, score: 43 },
      { name: "bus", score: null },
    ];
    const component = render(
      <Score score={trustyou} amenities_ratings={amenities2} />
    );
    expect(component.getByTestId("amenities0").textContent).toBe("WiFi");
    expect(component.getByTestId("amenities1").textContent).toBe("Breakfast");
    expect(component.getByTestId("amenities2").textContent).toBe("Room");
    expect(component.getByTestId("amenities3").textContent).toBe("Comfort");
    expect(component.getByTestId("amenities4").textContent).toBe("Food");
    expect(component.queryByTestId("amenities5")).toBe(null);
    expect(component.queryByTestId("amenities6")).toBe(null);
    expect(component.queryByTestId("amenities7")).toBe(null);
    expect(component.queryByTestId("amenities8")).toBe(null);
    expect(component.getByTestId("amenities-score0").textContent).toBe(
      String(amenities[0].score)
    );
    expect(component.getByTestId("amenities-score1").textContent).toBe(
      String(amenities[1].score)
    );
    expect(component.getByTestId("amenities-score2").textContent).toBe(
      String(amenities[2].score)
    );
    expect(component.getByTestId("amenities-score3").textContent).toBe(
      String(amenities[3].score)
    );
    expect(component.getByTestId("amenities-score4").textContent).toBe(
      String(amenities[4].score)
    );
    expect(component.queryByTestId("amenities-score5")).toBe(null);
    expect(component.queryByTestId("amenities-score6")).toBe(null);
    expect(component.queryByTestId("amenities-score7")).toBe(null);
    expect(component.queryByTestId("amenities-score8")).toBe(null);
  });
});
