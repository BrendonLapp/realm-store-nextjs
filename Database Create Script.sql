CREATE TABLE Card (
	CardID INT NOT NULL auto_increment,
    ApiID INT NOT NULL,
    CardName VARCHAR(100) NOT NULL,
    SetName VARCHAR(150) NOT NULL,
    CardNumber VARCHAR(10) NOT NULL,
    Printing VARCHAR(20) NOT NULL,
    Rarity VARCHAR(20) NOT NULL,
    Price DECIMAL(15,2) NOT NULL,
    Image VARCHAR(200) NOT NULL,
    
    PRIMARY KEY (CardID)
);

CREATE TABLE Quality (
	QualityID INT NOT NULL,
	QualityName VARCHAR(50) NOT NULL,
    ShortName VARCHAR(2) NOT NULL,
    PercentageOff DECIMAL(4,2) NOT NULL,
    
    PRIMARY KEY (QualityID)
);

CREATE TABLE CardInventory (
	CardInventoryID INT NOT NULL auto_increment,
    CardID INT NOT NULL,
    QualityID INT NOT NULL,
    Quantity INT NOT NULL,
    
    PRIMARY KEY (CardInventoryID),
    FOREIGN KEY (CardID) REFERENCES Card(CardID),
    FOREIGN KEY (QualityID) REFERENCES Quality(QualityID)
);
