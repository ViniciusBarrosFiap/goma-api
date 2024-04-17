class ListCharacteristicsProductsDTO {
  name: string;
  description: string;
}

class ListImagesProductsDTO {
  url: string;
  alt?: string;
}

export class ListProductsDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly brand: string,
    readonly price: number,
    readonly characteristics: ListCharacteristicsProductsDTO[],
    readonly images: ListImagesProductsDTO[],
  ) {}
}
