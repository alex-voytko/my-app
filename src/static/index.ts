import { Sort } from "../models";

export const sortData: Sort[] = [
  Sort.PriceInc,
  Sort.PriceDecr,
  Sort.StockInc,
  Sort.StockDecr,
  Sort.RatingInc,
  Sort.RatingDecr,
];

export const tableHeadData: { className: string; tableCell: string }[] = [
  {
    className: "table-id",
    tableCell: "ID",
  },
  {
    className: "table-photo",
    tableCell: "Photo",
  },
  {
    className: "table-name",
    tableCell: "Name",
  },
  {
    className: "table-descr",
    tableCell: "Description",
  },
  {
    className: "table-stock",
    tableCell: "Stock",
  },
  {
    className: "table-category",
    tableCell: "Category",
  },
  {
    className: "table-rate",
    tableCell: "Rate",
  },
  {
    className: "table-price",
    tableCell: "Price",
  },
];
