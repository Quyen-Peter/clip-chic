export function flyToCart(e: MouseEvent, imgUrl: string) {
  const cartIcon = document.querySelector(".header-icon[alt='Cart']") as HTMLElement;

  if (!cartIcon) {
    console.warn("Không tìm thấy icon giỏ hàng!");
    return;
  }

  // ✅ Tính vị trí chuột thật (có scroll)
  const startX = e.clientX + window.scrollX;
  const startY = e.clientY + window.scrollY;

  // ✅ Tạo hình bay
  const flyingImg = document.createElement("img");
  flyingImg.src = imgUrl || "https://via.placeholder.com/80x80?text=Cart";
  flyingImg.style.position = "fixed";
  flyingImg.style.zIndex = "99999";
  flyingImg.style.width = "80px";
  flyingImg.style.height = "80px";
  flyingImg.style.borderRadius = "10px";
  flyingImg.style.left = `${e.clientX - 40}px`;
  flyingImg.style.top = `${e.clientY - 40}px`;
flyingImg.style.transition =
  "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease-in";


  document.body.appendChild(flyingImg);

  // ✅ Lấy vị trí icon giỏ hàng
  const cartRect = cartIcon.getBoundingClientRect();
  const endX = cartRect.left + cartRect.width / 2;
  const endY = cartRect.top + cartRect.height / 2;

  // ✅ Tạo animation bay lên
  requestAnimationFrame(() => {
    flyingImg.style.transform = `translate(${endX - e.clientX}px, ${
      endY - e.clientY
    }px) scale(0.1)`;
    flyingImg.style.opacity = "0";
  });

  // ✅ Xóa ảnh sau animation
  flyingImg.addEventListener("transitionend", () => {
    flyingImg.remove();
    cartIcon.classList.add("cart-bounce");
    setTimeout(() => cartIcon.classList.remove("cart-bounce"), 500);
  });
}
