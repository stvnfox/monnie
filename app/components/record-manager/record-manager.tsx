import type { FunctionComponent } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { AddRecordForm } from "./components/add-record-form";

export const RecordManager: FunctionComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>add record</CardTitle>
      </CardHeader>
      <CardContent>
        <AddRecordForm />
      </CardContent>
    </Card>
  );
};
