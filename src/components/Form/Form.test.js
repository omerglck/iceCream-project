import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./../Form/index";
import userEvent from "@testing-library/user-event";

test("koşulları onaylanmasına göre buton aktifliği", async () => {
  // test bileşenini ekrana basma (sanal)
  render(<Form />);

  // userın kurulumu
  const user = userEvent.setup();

  // gerekli elemanları al
  const orderBtn = screen.getByRole("button");
  const checkBox = screen.getByRole("checkbox");

  // buton başlangıçta inaktiftir.
  expect(orderBtn).toBeDisabled();

  // checkboxı tikle
  await user.click(checkBox);

  // buton aktif mi kontrol et
  expect(orderBtn).toBeEnabled();

  // checkboxdan tiki kaldır
  await user.click(checkBox);

  // buton inaktif oldu mu
  expect(orderBtn).toBeDisabled();
});

test("onayla butonu hover olunca bildirim çıkarma", async () => {
  render(<Form />);
  const user = userEvent.setup();

  // gerekli elemanlar
  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  // butonu aktifleştirmek için checkbox tiklenmeli
  await user.click(checkBox);

  // mouseu butonun üzerine getirme
  fireEvent.mouseEnter(button);

  // popup ı çağırma
  const popup = screen.getByText("Size gerçekten", { exact: false });

  // bildirim gözüküyor mu
  expect(popup).toBeVisible();

  // mouseu butondan çek
  fireEvent.mouseLeave(button);

  // popup görünür değildir.Elimizde görünür olmayan diye bir özellik olmadıığı için not kullandık
  expect(popup).not.toBeVisible();
});
