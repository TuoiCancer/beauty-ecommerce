import AdminProductPage from "./AdminProductPage";
import { Locale } from "../../../../../i18n-config";
import { getDictionary } from "../../../../../get-dictionary";

const Page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang)
  return <AdminProductPage dictionary={dictionary} lang={lang} />;
}

export default Page;