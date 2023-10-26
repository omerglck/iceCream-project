import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("sosları ekleme ve çıkarmanın toplam fiyatı etkiler", async () => {
  render(<Toppings />);
  const user = userEvent.setup();

  // toplam başlığını çağırma
  const total = screen.getByRole("heading", { name: /Soslar Ücreti: 0/i });

  // bir sosu çağırma
  const mochiCheck = await screen.findByRole("checkbox", { name: /mochi/i });
  // sosu sepete ekleme
  await user.click(mochiCheck);

  // toplam kontrol
  expect(total).toHaveTextContent("3");

  // bir sosu çağırma
  const cherriesCheck = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  // sosu sepete ekleme
  await user.click(cherriesCheck);

  // toplam kontrol
  expect(total).toHaveTextContent("6");

  // sosları kaldırma
  await user.click(mochiCheck);
  expect(total).toHaveTextContent("3");

  await user.click(cherriesCheck);
  expect(total).toHaveTextContent("0");
});
