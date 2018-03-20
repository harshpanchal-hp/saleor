import AddIcon from "material-ui-icons/Add";
import Card from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import * as React from "react";

import PageHeader from "../../components/PageHeader";
import i18n from "../../i18n";
import CategoryList from "../components/CategoryList";
import { CategoryPropertiesQuery } from "../gql-types";

interface CategorySubcategoriesProps {
  data: CategoryPropertiesQuery;
  loading?: boolean;
  onCreate?();
}

const CategorySubcategories: React.StatelessComponent<
  CategorySubcategoriesProps
> = ({ data, loading, onCreate }) => (
  <Card>
    <PageHeader
      title={i18n.t("Subcategories", {
        context: "title"
      })}
    >
      <IconButton disabled={loading} onClick={onCreate}>
        <AddIcon />
      </IconButton>
    </PageHeader>
    <CategoryList
      categories={
        data.category && data.category.children && data.category.children.edges
      }
    />
  </Card>
);

export default CategorySubcategories;
