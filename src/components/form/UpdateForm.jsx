/* eslint-disable react/prop-types */
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Controller } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateForm = ({
  onSubmit,
  handleSubmit,
  control,
  errors,
  items,
  isLoading,
}) => {
  const navigate = useNavigate();
  const brands = useLoaderData();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center ">
      <div className="mb-4">
        <Controller
          name="name"
          control={control}
          defaultValue={items?.data?.name}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <div>
              <Input {...field} type="text" variant={"bordered"} label="Name" />
              {errors.name && (
                <p className="text-left text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      <div className="md:flex gap-4 w-full">
        <div className="mb-4 flex-1">
          <Controller
            name="subCategory"
            control={control}
            defaultValue={items?.data?.subCategory}
            rules={{ required: "Subcategory is required" }}
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  label="Select an Category"
                  variant="bordered"
                  defaultSelectedKeys={[items?.data?.subCategory]}
                >
                  {categories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
                {errors.subCategory && (
                  <p className="text-left text-red-500 text-sm mt-2">
                    {errors.subCategory.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="mb-4 flex-1">
          <Controller
            name="brand"
            control={control}
            defaultValue={items?.data?.brand}
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  label="Select an brand"
                  variant="bordered"
                  defaultSelectedKeys={[items?.data?.brand]}
                >
                  {brands.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>
                {errors.brand && (
                  <p className="text-left text-red-500 text-sm mt-2">
                    {errors.brand.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="md:flex gap-4 w-full">
        <div className="mb-4 flex-1">
          <Controller
            name="price"
            control={control}
            defaultValue={items?.data?.price}
            rules={{ required: "Price is required" }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  type="number"
                  variant="bordered"
                  label="Price"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
                {errors.price && (
                  <p className="text-left text-red-500 text-sm mt-2">
                    {errors.price.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="mb-4 flex-1">
          <Controller
            name="ratings"
            control={control}
            defaultValue={items?.data?.ratings}
            rules={{
              max: { value: 5, message: "Ratings cannot exceed 5" },
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  type="number"
                  variant="bordered"
                  label="Ratings"
                />
                {errors.ratings && (
                  <p className="text-left text-red-500 text-sm mt-2">
                    {errors.ratings.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="md:flex gap-4 w-full">
        <div className="mb-4 ">
          <Controller
            name="file"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <Input {...field} type="file" variant="underlined" />
              </div>
            )}
          />
        </div>
        <div className="relative flex items-center">
          <Divider className="flex-1" />
          <div className="relative flex justify-center text-xs uppercase">
            <span className=" px-2 text-muted-foreground">Or</span>
          </div>
          <Divider className="flex-1" />
        </div>
        <div className="mb-4 flex-1">
          <Controller
            name="image"
            defaultValue={items?.data?.images ?? [0]}
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  type="text"
                  variant="bordered"
                  label="Image Url"
                />
                {errors.image && (
                  <p className="text-left text-red-500 text-sm mt-2">
                    {errors.image.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <div className="mb-4">
        <Controller
          name="shortDescription"
          control={control}
          defaultValue={items?.data?.shortDescription}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                type="text"
                variant="bordered"
                label="Short Description"
              />
            </div>
          )}
        />
      </div>

      <div className="flex gap-4 w-full">
        <Button
          color="primary"
          className="w-[20%]  rounded-lg py-1 font-bold  "
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          color="primary"
          className="w-[20%]  rounded-lg py-1 font-bold  "
          type="submit"
        >
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Updating
            </>
          ) : (
            <>Update</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdateForm;
const categories = [
  "Shirt",
  "T-shirt",
  "Pant",
  "Watch",
  "Shoes",
  "Hat",
  "Dress",
  "Jeans",
  "Jacket",
  "Sneakers",
  "Belt",
  "Gloves",
  "Scarf",
  "Sunglasses",
  "Boots",
  "Skirt",
  "Sweater",
  "Shorts",
  "Socks",
  "Blouse",
  "Coat",
  "Flip Flops",
  "Suit",
  "Tie",
  "Handbag",
  "Backpack",
  "Umbrella",
  "Jumpsuit",
  "Cardigan",
  "Tank Top",
];
