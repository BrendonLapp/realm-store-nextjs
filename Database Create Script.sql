DROP TABLE CardInventory
DROP TABLE Quality
DROP TABLE Card

CREATE TABLE Card (
	cardID INT NOT NULL auto_increment,
    apiID INT NOT NULL,
    cardName VARCHAR(100) NOT NULL,
    setName VARCHAR(150) NOT NULL,
    cardNumber VARCHAR(10) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    image VARCHAR(200) NOT NULL,
    
    PRIMARY KEY (CardID)
);

CREATE TABLE Quality (DROP TABLE CardInventory
DROP TABLE Quality
DROP TABLE Card

CREATE TABLE Card (
	cardID INT NOT NULL auto_increment,
    apiID INT NOT NULL,
    cardName VARCHAR(100) NOT NULL,
    setName VARCHAR(150) NOT NULL,
    cardNumber VARCHAR(10) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    manualPricing BOOLEAN NOT NULL,
    image VARCHAR(200) NOT NULL,
    
    PRIMARY KEY (CardID)
);

CREATE TABLE Quality (
	qualityID INT NOT NULL,
	qualityName VARCHAR(50) NOT NULL,
    shortName VARCHAR(2) NOT NULL,
    percentageOff DECIMAL(4,2) NOT NULL,
    
    PRIMARY KEY (QualityID)
);

CREATE TABLE CardInventory (
	cardInventoryID INT NOT NULL auto_increment,
    cardID INT NOT NULL,
    qualityID INT NOT NULL,
    quantity INT NOT NULL,
    printing VARCHAR(20) NOT NULL,
    specialPrinting VARCHAR(30) NULL,
    
    PRIMARY KEY (CardInventoryID),
    FOREIGN KEY (CardID) REFERENCES Card(CardID),
    FOREIGN KEY (QualityID) REFERENCES Quality(QualityID)
);

	qualityID INT NOT NULL,
	qualityName VARCHAR(50) NOT NULL,
    shortName VARCHAR(2) NOT NULL,
    percentageOff DECIMAL(4,2) NOT NULL,
    
    PRIMARY KEY (QualityID)
);

CREATE TABLE CardInventory (
	cardInventoryID INT NOT NULL auto_increment,
    cardID INT NOT NULL,
    qualityID INT NOT NULL,
    quantity INT NOT NULL,
    printing VARCHAR(20) NOT NULL,
    specialPrinting VARCHAR(30) NULL,
    
    PRIMARY KEY (CardInventoryID),
    FOREIGN KEY (CardID) REFERENCES Card(CardID),
    FOREIGN KEY (QualityID) REFERENCES Quality(QualityID)
);

CREATE TABLE Gallery (
	imageID INT NOT NULL,
    imageLink VARCHAR(500) NULL,
    altName VARCHAR(100) NULL,
    
    PRIMARY KEY (imageID)
)
