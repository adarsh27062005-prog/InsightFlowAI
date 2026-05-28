from app.services.data_store import get_dataframe
import pandas as pd

def build_dataset_context():

    df = get_dataframe()

    if df is None:
        return "No dataset uploaded."

    context = []

    context.append(f"Rows: {len(df)}")
    context.append(f"Columns: {list(df.columns)}")

    numeric_df = df.select_dtypes(include="number")

    if not numeric_df.empty:

        context.append("\nNumeric Summary:")

        for col in numeric_df.columns:

            context.append(
                f"{col}: mean={df[col].mean():.2f}, "
                f"max={df[col].max():.2f}, "
                f"min={df[col].min():.2f}"
            )

    return "\n".join(context)