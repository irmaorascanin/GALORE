import {
  artworkSchema,
  artworkUpdateSchema,
} from "../validators/artwork.validator";

describe("Artwork Validator Unit Tests", () => {

  test("should pass valid artwork data", () => {
    const result = artworkSchema.safeParse({
      title: "Forest Light",
      description: "Oil on canvas",
      imageUrl: "https://example.com/image.jpg",
      price: 200,
    });

    expect(result.success).toBe(true);
  });

  test("should fail when title is missing", () => {
    const result = artworkSchema.safeParse({
      description: "Oil on canvas",
      imageUrl: "https://example.com/image.jpg",
      price: 200,
    });

    expect(result.success).toBe(false);
  });

  test("should fail when price is negative", () => {
    const result = artworkSchema.safeParse({
      title: "Forest Light",
      price: -50,
    });

    expect(result.success).toBe(false);
  });

  test("should pass artwork update with valid price", () => {
    const result = artworkUpdateSchema.safeParse({
      price: 299,
    });

    expect(result.success).toBe(true);
  });

});