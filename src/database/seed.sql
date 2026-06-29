-- Seed data for COUPON_IMAGE
-- Uses standard Wikimedia thumbnail sizes only: 20, 40, 60, 120, 250, 330, 500...
-- DAFAULT_IMAGE = 1 means shown as category thumbnail

DELETE FROM COUPON_IMAGE;

INSERT INTO COUPON_IMAGE (URL, OCCASION, DAFAULT_IMAGE) VALUES

-- Food & Dining
('https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Swiggy_logo.png/250px-Swiggy_logo.png', 'Food', 1),
('https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/250px-Zomato_logo.png', 'Food', 0),

-- Shopping
('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/250px-Amazon_logo.svg.png', 'Shopping', 1),
('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Flipkart_logo_%282026%29.svg/330px-Flipkart_logo_%282026%29.svg.png', 'Shopping', 0),
('https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_Logo.png', 'Shopping', 0),

-- Entertainment
('https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/120px-Netflix_icon.svg.png', 'Entertainment', 1),
('https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/250px-Amazon_Prime_Video_logo.svg.png', 'Entertainment', 0),
('https://upload.wikimedia.org/wikipedia/commons/7/75/Bookmyshow-logoid.png', 'Entertainment', 0),

-- Travel
('https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Makemytrip_logo.svg/330px-Makemytrip_logo.svg.png', 'Travel', 1),
('https://upload.wikimedia.org/wikipedia/en/thumb/4/45/IRCTC_Logo.svg/250px-IRCTC_Logo.svg.png', 'Travel', 0),

-- Fashion
('https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_Logo.png', 'Fashion', 1),
('https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Nykaa_New_Logo.svg/330px-Nykaa_New_Logo.svg.png', 'Fashion', 0),

-- Groceries
('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Blinkit-yellow-rounded.svg/250px-Blinkit-yellow-rounded.svg.png', 'Groceries', 1),
('https://upload.wikimedia.org/wikipedia/commons/a/a2/BigBasket_Logo.png', 'Groceries', 0),

-- Default
('https://i.postimg.cc/Qx7Fm4sm/Logo.png', 'Default', 1);
